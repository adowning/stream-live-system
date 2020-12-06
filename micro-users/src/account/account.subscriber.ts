import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EntityManager,
} from 'typeorm';
import { Account } from './entity/account.entity';
import { AccountHistory } from './entity/account-history.entity';
import { AccountHistoryMethod } from './account.enum';

@EventSubscriber()
export class AccountSubscriber implements EntitySubscriberInterface<Account> {
  listenTo() {
    return Account;
  }

  async afterInsert(event: InsertEvent<Account>) {
    await this.createHistories(
      event.entity,
      AccountHistoryMethod.Create,
      event.manager,
    );
  }

  async afterUpdate(event: UpdateEvent<Account>) {
    const updatedData: any = { id: event.entity.id };
    event.updatedColumns.forEach(({ propertyName }) => {
      updatedData[propertyName] = event.entity[propertyName];
    });
    await this.createHistories(
      updatedData,
      AccountHistoryMethod.Update,
      event.manager,
    );
  }

  private async createHistories(
    data: any,
    method: AccountHistoryMethod,
    manager: EntityManager,
  ): Promise<void> {
    await Promise.all(
      Object.keys(data)
        .filter(key => !['id'].includes(key))
        .map(async key => {
          const history = new AccountHistory();
          history.field = key;
          history.value = data[key].toString();
          history.method = method;
          history.accountId = data.id;
          await manager.save(history);
        }),
    );
  }
}
