import { ConflictException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDTO: CreateUserDto) {
    try {
      await this.userModel.syncIndexes();
      return await this.userModel.create({
        fname: registerUserDTO.fname,
        lname: registerUserDTO.lname,
        email: registerUserDTO.email,
        password: registerUserDTO.password,
      });
    } catch (error: unknown) {
      const e = error as { code?: number };
      const duplicateKeyErrorCode = 11000;
      if (e.code === duplicateKeyErrorCode) {
        throw new ConflictException('Email already exists');
      } else {
        throw error;
      }
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async getUserProfile(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password');
  }
}
