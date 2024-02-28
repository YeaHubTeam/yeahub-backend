import {
  Entity,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length, IsUrl } from 'class-validator';

@Entity('skills')
@Unique(['title'])
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'title', unique: true })
  @Length(1, 255)
  title: string;

  @Column({ type: 'varchar', length: 255, name: 'description' })
  @Length(1, 255)
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsUrl()
  imageSrc: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
