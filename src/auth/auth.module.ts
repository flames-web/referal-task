import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import {JwtStrategy} from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { SessionSchema } from 'src/models/session';

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretOrKey,
      signOptions:{expiresIn:'1d'},
    }),
    MongooseModule.forFeature([{name:'Session',schema:SessionSchema}])
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers:[AuthController],
  exports:[AuthService]
})
export class AuthModule {}