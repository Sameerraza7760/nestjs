import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userservices: UsersService) {}

  register(username: string, password: string): CreateUserDto {
    const newUser: CreateUserDto = this.userservices.createUser(
      username,
      password,
    );
    return newUser;
  }

  getAllUsers(): CreateUserDto[] {
    return this.userservices.getAllUsers();
  }

  // Optional: get all users
  // getAllUsers(): CreateUserDto[] {

  //   return this.UsersService['users'];

  // }
}
