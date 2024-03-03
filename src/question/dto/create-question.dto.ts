import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsArray,
  IsUrl,
  IsNumber,
  Min,
  Max,
  IsIn,
  IsOptional,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ example: 'Event Loop', description: 'Question title' })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    example: 'What is Event Loop?',
    description: 'question description',
  })
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

  @ApiProperty({
    example: ['JavaScript'],
    description: 'keywords your question',
  })
  @IsArray()
  @Length(1, 255, { each: true })
  keywords: string[] | null;

  @ApiProperty({
    example: '2+2=4',
    description: 'short answer to the question',
  })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  shortAnswer: string | null;

  @ApiProperty({ example: '2+2=4', description: 'long answer to the question' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  longAnswer: string | null;

  @ApiProperty({
    example: 'draft',
    description: 'status your question',
    required: true,
  })
  @IsIn(['public', 'draft'])
  status: 'public' | 'draft';

  @ApiProperty({
    example: 8,
    description: 'rating your question',
    required: true,
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  rate: number;
}
