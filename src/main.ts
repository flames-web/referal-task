import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'; 
import { NestExpressApplication } from '@nestjs/platform-express';
import MongoStore = require('connect-mongo');
import {Request,Response,NextFunction} from 'express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

const dbUrl = 'mongodb://localhost:27017/nestjs'
const store = MongoStore.create({
  mongoUrl:dbUrl,
  // secret:'olalekan',
touchAfter: 24 * 60 * 60,
})

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e)
})

  app.use(
    session({
      store,
      secret: 'olalekan',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  
app.use((req:Request,res:Response,next:NextFunction) => {
  res.locals.currentUser = req.user;
  res.locals.session = req.session;
  next();
  });

  await app.listen(3000);
}
bootstrap();