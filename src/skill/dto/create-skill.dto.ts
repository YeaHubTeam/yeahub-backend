import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsUrl } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ example: 'JAVA', description: 'Title of the skill' })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({ description: 'Description of the skill' })
  @IsString()
  @Length(1, 255)
  description: string;

  @ApiProperty({
    example: 'http://example.com/imageSrc.jpg',
    description: 'ID of the related resume',
    required: false,
  })
  @IsUrl()
  imageSrc: string | null;
}
