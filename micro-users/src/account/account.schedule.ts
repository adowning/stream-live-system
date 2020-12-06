import ms from 'ms';
import { Interval, NestSchedule } from 'nest-schedule';
import { Injectable, Logger } from '@nestjs/common';
import { AccountService } from './account.service';

@Injectable()
export class AccountSchedule extends NestSchedule {
  private readonly logger = new Logger(AccountSchedule.name);

  constructor(
    private readonly accountService: AccountService,
  ) {
    super();
  }

  @Interval(ms('1m'))
  async runFetch() {
    try {
      const fetchedIds = await this.accountService.fetch();
      this.logger.log(`Successfully fetched accounts [${fetchedIds.join(', ')}]`);
    } catch (err) {
      this.logger.error(`Failed to fetch accounts (${err.stack})`);
    }
  }
}
