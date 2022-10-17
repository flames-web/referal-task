import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getCamp(): {name : string[]} {
    return {name :['olalekan','samuel']}
  }
}
