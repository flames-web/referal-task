import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService :AppService){}
  // @Get()
  // getHome() {
  //    return this.appService.getCamp();
  // }

}