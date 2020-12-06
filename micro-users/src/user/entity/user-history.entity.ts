import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserHistoryMethod } from '../user.enum';
import { User } from './user.entity';
import { PartialFilled } from 'src/shared/partial-filled.model';

@Entity('userHistory')
export class UserHistory extends PartialFilled<UserHistory> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  field: string;

  @Column()
  value: string;

  @Column()
  method: UserHistoryMethod;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @ManyToOne(
    () => User,
    user => user.histories,
  )
  user: User;
}
