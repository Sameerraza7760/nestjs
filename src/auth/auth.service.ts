import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bycrypt from 'bcrypt';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedInUserDto } from './dto/loggedIn-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userservices: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    const hashedPassword = bycrypt.hashSync(data.password, 10);
    const userToCreate = {
      ...data,
      password: hashedPassword,
    };

    const user = await this.userservices.createUser(userToCreate);
    const payload = { email: user.email, sub: user._id };
    const token = await this.jwtService.signAsync(payload);
    console.log('JWT Token:', token);

    return { accesstoken: token };
  }

  async login(data: LoggedInUserDto) {
    const { email, password } = data;

    const user = await this.userservices.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.role, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token: token,
      user: {
        id: user.role,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
      },
    };
  }
}
