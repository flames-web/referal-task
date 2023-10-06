import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'; 
import { NestExpressApplication } from '@nestjs/platform-express';
// import {Request,Response,NextFunction} from 'express';


async function bootstrap() {
const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: 'olalekan',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );  
// app.use((req:Request,res:Response,next:NextFunction) => {
//   res.locals.currentUser = req.user;
//   res.locals.session = req.session;
//   next();
//   });

  await app.listen(process.env.CYCLIC_URL);
}
bootstrap();