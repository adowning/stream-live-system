import { PartialFilled } from 'src/shared/partial-filled.model';

export class MonsterAccount extends PartialFilled<MonsterAccount> {
  readonly row_number: string;
  readonly accountID: string;
  readonly accountName: string;
  readonly accountType: string;
  readonly address1: string;
  readonly alert: boolean;
  readonly city: string;
  readonly companyID: string;
  readonly companyKey: number;
  readonly companyName: string;
  readonly country: string;
  readonly county: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly leadSourceID: string;
  readonly phone1: string;
  readonly state: string;
  readonly zip: string;
  readonly timeStamp: string;
  readonly userName: string;
}
