import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Length,
  IsUrl,
  IsUUID,
  IsNumber,
  Min,
  Max,
  IsIn,
} from 'class-validator';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'title' })
  @Length(1, 255)
  title: string;

  @Column({ type: 'varchar', length: 255, name: 'description' })
  @Length(1, 255)
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsUrl()
  imageSrc: string | null;

  @Column({ type: 'varchar', length: 255, array: true, nullable: true })
  @Length(1, 255, { each: true })
  keywords: string[] | null;

  @Column({ type: 'varchar', length: 1000, name: 'longAnswer', nullable: true })
  @Length(1, 1000)
  longAnswer: string | null;

  @Column({ type: 'varchar', length: 255, name: 'shortAnswer', nullable: true })
  @Length(1, 255)
  shortAnswer: string | null;

  @Column({ type: 'varchar', length: 255, name: 'status', nullable: true })
  @IsIn(['public', 'draft'])
  status: 'public' | 'draft';

  @Column({ type: 'int', name: 'rate', nullable: true })
  @IsNumber()
  @Min(1)
  @Max(10)
  rate: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
