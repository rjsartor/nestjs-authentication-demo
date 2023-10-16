import { Controller, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Headers('authorization') authHeader: string, @Body() user: any): any {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Invalid authorization header.');
    }
    
    const actualToken = authHeader.split(' ')[1];
    
    if (!actualToken) {
      throw new BadRequestException('Missing token.');
    }

    if (!user || !user.email || !user.name) {
      throw new BadRequestException('Invalid user data.');
    }

    return this.authService.login(user, actualToken);
  }
}
