import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { MonsterModule } from 'src/monster/monster.module';
import { ScheduleModule } from 'nest-schedule';
import { AccountSchedule } from './account.schedule';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MonsterModule,
    ScheduleModule.register(),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  providers: [AccountService, AccountSchedule],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
