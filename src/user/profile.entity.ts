import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { IsUUID } from 'class-validator';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsUUID('4')
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
