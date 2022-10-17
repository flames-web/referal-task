import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import {PassportModule} from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretOrKey,
      signOptions:{expiresIn:'60s'}
    }),
  ],
  providers: [AuthService,LocalStrategy],
  controllers:[AuthController],
  exports:[AuthService]
})
export class AuthModule {}
