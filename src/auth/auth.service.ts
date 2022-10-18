import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as  bcrypt  from 'bcrypt';
 
@Injectable()
export class AuthService {
    constructor (
        private usersService :UserService,
        private jwtService : JwtService
        ){}
    async validateUser(username:string, password :string){
    const user = await this.usersService.findOne(username)
     if(user) {
    const passwordValid = await bcrypt.compareSync(password,user.password); 
    if (passwordValid){
      return user
     } 
} else {
    return null;
}
}
    async login(user) {
        const payload = {username:user.username,sub:user.userId}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}