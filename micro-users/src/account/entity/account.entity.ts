import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AccountHistory } from './account-history.entity';
import { PartialFilled } from 'src/shared/partial-filled.model';
import { PhoneType } from '../account.enum';
import { User } from 'src/user/entity';

export interface Address extends PartialFilled<Address> {
  street: string;
  zip: string;
  city: string;
  state: string;
  country: string;
  lat: string;
  lng: string;
  placesId: string;
}
export interface Phone extends PartialFilled<Phone> {
  number: string;
  formated: string;
  validityChecked: string;
  isValid: string;
  phoneType: PhoneType;
  canText: boolean;
}

@Entity()
export class Account extends PartialFilled<Account> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  accountName: string;

  @Column()
  externalId: string;

  @Column()
  accountType: string;

  @Column('json', { nullable: true, array: true })
  phoneList: Phone[];

  @Column('json', { nullable: true, array: true })
  address: Address;

  @Column()
  companyName: string;

  @Column()
  leadSourceID: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  emailAddress: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @OneToMany(
    () => AccountHistory,
    accountHistory => accountHistory.account,
  )
  histories: AccountHistory[];

  @ManyToOne(
    () => User,
    a => a.accountsCreated,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  createdBy?: User;
}
