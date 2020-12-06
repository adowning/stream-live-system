import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { MonsterService } from 'src/monster/monster.service';
import { InvalidExternalIdException } from './exception';
import { Account } from './entity';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly monsterService: MonsterService,
  ) {}

  async fetch(): Promise<string[]> {
    const externalAccountsTotal = await this.monsterService.findAccountsTotal();
    const pageCount = Math.ceil(externalAccountsTotal / 100);
    const externalAccounts = await this.monsterService.findAccounts(pageCount);
    return await this.accountRepository.syncByExternalIds(
      externalAccounts.map(externalAccount => ({
        externalId: externalAccount.accountID,
        accountName: externalAccount.accountName,
        orders: [],
        accountType: externalAccount.accountType,
        emailAddress: externalAccount.email,
      })),
    );
  }

  findById(id: string) {
    return this.accountRepository.findOne(id);
  }

  list() {
    return this.accountRepository.find();
  }

  async fetchByExternalId(externalId: string): Promise<string> {
    const externalAccount = await this.monsterService.findAccount(externalId);
    if (!externalAccount) {
      throw new InvalidExternalIdException();
    }
    const [id] = await this.accountRepository.syncByExternalIds([
      {
        externalId: externalAccount.accountID,
        accountName: externalAccount.accountName,
        accountType: externalAccount.accountType,
        emailAddress: externalAccount.email,
      },
    ]);

    return id;
  }
}
