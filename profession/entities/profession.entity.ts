import { IsUUID, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('professions')
export class ProfessionEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Length(1, 255)
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Length(1, 255)
  description: string;

  @Column({ type: 'varchar', array: true })
  @IsUUID('4')
  skills: string[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Length(1, 255)
  image_src: string;

  @Column({ type: 'varchar', array: true })
  keywords: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
