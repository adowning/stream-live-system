import {
  Repository,
  EntityRepository,
  In,
  Transaction,
  TransactionRepository,
} from 'typeorm';
import { Account } from 'src/account/entity/account.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  findByExternalIds(externalIds: string[]): Promise<Account[]> {
    return this.find({
      where: { externalId: In(externalIds) },
    });
  }

  @Transaction()
  async syncByExternalIds(
    records: Array<Partial<Account>>,
    @TransactionRepository() repository?: AccountRepository,
  ): Promise<string[]> {
    const externalIds = records.map(record => record.externalId);
    const actualAccounts = await repository.findByExternalIds(externalIds);
    const fetchedIds: string[] = [];

    await Promise.all(
      records.map(async record => {
        const actualAccount = actualAccounts.find(
          account => account.externalId === record.externalId,
        );

        if (actualAccount) {
          actualAccount.emailAddress = record.emailAddress;
          actualAccount.accountType = record.accountType;
          actualAccount.accountName = record.accountName;
          await repository.save(actualAccount);
          fetchedIds.push(actualAccount.id);
        } else {
          const account = new Account();
          account.emailAddress = record.emailAddress;
          account.accountType = record.accountType;
          account.accountName = record.accountName;
          account.externalId = record.externalId;
          await repository.save(account);
          fetchedIds.push(account.id);
        }
      }),
    );

    return fetchedIds;
  }
}
