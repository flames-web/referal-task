import { 
  Controller,
  Request,
  Post, 
  UseGuards, 
  Get,
  Session as GetSession ,
  Body
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import {Session} from 'express-session';
import {UserService} from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { RegisterDto } from 'src/user/register.dto';
import { AuthService } from './auth.service';
import {T} from 'src/types/user';
import { LocalAuthGuard } from './local-auth.guard';

type UserSession = Session & Record<'user', any>;

@Controller('api/v1')
export class AuthController {
  constructor( 
    private userService :UserService,
    private authService : AuthService,
     @InjectModel('Session') private readonly sessionModel:Model<T>
    ){}


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
      @Body() registerDto: RegisterDto, 
      @GetSession() session :  UserSession,
      @Request() req
      ) {
     if(!session.user){
      let user = await this.userService.findByLogin(registerDto);
      const token = await this.authService.login(user);
      const userSession = await this.sessionModel.create({
        sessionId:session.id,
        username:user.username,
     })
     user = req.user;
      session.user = {
         userSession,
         token
      }    
      return {sessionId:session.id, token};
     }else {
      return {message:'You have an active session'}
     }
    }
    
  @UseGuards(JwtAuthGuard)
  @Get('home')
 async getProfile(@Request() req,
   @GetSession() session: UserSession
  ) {  
    if(session.user) {
      const {user} = session;
      return {token:user.token,sessionId:session.id};
    }else {
      return {message:'You need to have an active session'}
    }
  }

  @Post('logout')
  logout(@GetSession() session: UserSession) {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);
        resolve(undefined);
      });
    });
  }
}  