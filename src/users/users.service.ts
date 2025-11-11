import { Injectable } from '@nestjs/common';
interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  createUser(username: string, password: string) {
    const newUser: User = {
      id: this.idCounter++,
      username,
      password,
    };
    this.users.push(newUser);
    return newUser;
  }
  getAllUsers(): User[] {
    return this.users;
  }
}
