import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedInUserDto } from './dto/loggedIn-user-dto';

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

  // @Get('user')
  // getAllUsers() {
  //   return this.authService.getAllUsers();
  // }
}
