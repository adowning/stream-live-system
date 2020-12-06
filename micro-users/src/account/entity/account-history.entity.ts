import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { AccountHistoryMethod } from '../account.enum';
import { Account } from './account.entity';
import { PartialFilled } from 'src/shared/partial-filled.model';

@Entity('accountHistory')
export class AccountHistory extends PartialFilled<AccountHistory> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  accountId: string;

  @Column()
  field: string;

  @Column()
  value: string;

  @Column()
  method: AccountHistoryMethod;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @ManyToOne(
    () => Account,
    account => account.histories,
  )
  account: Account;
}
