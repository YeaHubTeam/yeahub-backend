import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail, IsDate, IsUrl } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  @Length(1, 255)
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  @Length(1, 255)
  lastName: string;

  @ApiProperty({
    example: 'password',
    description: 'Password hash of the user',
  })
  @IsString()
  @Length(1, 255)
  passwordHash: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @IsString()
  @Length(1, 255)
  phone: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'USA',
    description: 'Country of the user',
    required: false,
  })
  @Length(1, 255)
  country: string | null;

  @ApiProperty({
    example: 'New York',
    description: 'City of the user',
    required: false,
  })
  @Length(1, 255)
  city: string | null;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birthday of the user',
    required: false,
    type: 'string',
    format: 'date',
  })
  @IsDate()
  birthday: Date | null;

  @ApiProperty({
    example: '123 Main St',
    description: 'Address of the user',
    required: false,
  })
  @Length(1, 255)
  address: string | null;

  @ApiProperty({
    example: 'http://example.com/avatar.jpg',
    description: 'Avatar URL of the user',
    required: false,
  })
  @IsUrl()
  avatarUrl: string | null;
}
