import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  createUser(
    @Body() createUserDto :RegisterDto) {
    const user = this.userService.newUser(createUserDto);
    return user
  }
  

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
