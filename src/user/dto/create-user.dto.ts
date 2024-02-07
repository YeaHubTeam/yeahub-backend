import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  firstName: string;

  @IsString()
  @Length(1, 255)
  lastName: string;

  @IsString()
  @Length(1, 255)
  phone: string;

  @IsEmail()
  @IsString()
  email: string;
}
