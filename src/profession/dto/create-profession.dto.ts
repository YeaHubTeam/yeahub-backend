import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Length } from 'class-validator';

export class CreateProfessionDto {
  @ApiProperty({
    example: 'Backend developer',
    description: 'Profession name',
    required: true,
  })
  @Length(1, 255)
  title: string;

  @ApiProperty({
    example: 'Work with TypeOrm, Nest.js ...',
    description: 'What did you do in this job',
    required: true,
  })
  @Length(1, 255)
  description: string;

  @ApiProperty({
    example: ['62c2b0c3-4d8b-482b-92f0-65b3e262716b'],
    description: "Skill's id",
    required: true,
  })
  @IsUUID('4')
  skills: string[];

  @ApiProperty({
    example:
      'https://media.geeksforgeeks.org/wp-content/uploads/20190506164011/logo3.png',
    description: 'Image src',
    required: true,
  })
  @Length(1, 255)
  image_src: string;

  @ApiProperty({
    example: ['Comunicated', 'Some keyword'],
    description: 'Personal skills',
    required: true,
  })
  keywords: string[];
}
