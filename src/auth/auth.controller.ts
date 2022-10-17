import { Controller, Request, Post, UseGuards, Get,Session as GetSession ,Body} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import {Session} from 'express-session';
import {UserService} from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {T} from '../types/user';
import { RegisterDto } from 'src/user/register.dto';
import { AuthService } from './auth.service';

type UserSession = Session & Record<'user', any>;

@Controller('api/v1')
export class AuthController {
  constructor( 
    private userService :UserService,
    private authService : AuthService
    ){}
  
  @Post('login')
  async login(
    @Body() registerDto: RegisterDto, 
    @GetSession() session :  UserSession,
    @Request() req
    ) {
      const user = await this.userService.findByLogin(registerDto);
      const token = await this.authService.login(user)
      session.user = {
        user,
      }
      return {sessionId:session.id,token};
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Request() req) {
    return req.user; 
  }
} 