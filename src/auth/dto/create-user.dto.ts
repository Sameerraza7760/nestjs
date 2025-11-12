import {
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Role } from 'src/user/user.type';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fname: string;

  @IsString()
  @IsNotEmpty()
  lname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsEnum(Role)
  @IsOptional()
  role: Role = Role.USER;
  @IsString()
  @MinLength(6)
  password: string;
}
