import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserHistory } from './user-history.entity';
import { PartialFilled } from 'src/shared/partial-filled.model';
import { Account } from 'src/account/entity';

@Entity()
export class User extends PartialFilled<User> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  externalId: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  emailAddress: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
  @OneToMany(
    () => UserHistory,
    userHistory => userHistory.user,
  )
  histories: UserHistory[];

  @OneToMany(
    () => Account,
    account => account.createdBy,
  )
  accountsCreated: Account[];
}
