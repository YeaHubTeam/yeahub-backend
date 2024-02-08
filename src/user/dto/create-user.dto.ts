import { IsString, IsEmail, Length, IsDate, IsUrl } from 'class-validator';

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

  @Length(1, 255)
  country: string | null;

  @Length(1, 255)
  city: string | null;

  @IsDate()
  birthday: Date | null;

  @Length(1, 255)
  address: string | null;

  @IsUrl()
  avatarUrl: string | null;
}
