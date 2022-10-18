import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService,AuthService],
})
export class AppModule {}

