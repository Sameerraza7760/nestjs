import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedInUserDto } from './dto/loggedIn-user-dto';
import { AuthGuard } from './auth.guard';
import { UseGuards, Request } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.authService.register(createUserDto);
    return createdUser;
  }
  @Post('login')
  async login(@Body() loggedInUserDto: LoggedInUserDto) {
    const loggedInUser = await this.authService.login(loggedInUserDto);
    return loggedInUser;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub as string);
  }
}
