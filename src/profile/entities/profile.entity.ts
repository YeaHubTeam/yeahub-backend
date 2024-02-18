import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsUUID } from 'class-validator';
import { UserEntity } from '../../user/user.entity';

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
