import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { JsonplaceholderModule } from './jsonplaceholder/jsonplaceholder.module';
// import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { Account } from './account/entity/account.entity';
import { ApmModule } from './apm/apm.module';
import { UserHistory } from './user/entity/user-history.entity';
import { UserSubscriber } from './user/user.subscriber';
import { CreateTableUser1576160977698 } from 'migration/1576160977698-create-table-user';
import { CreateTableUserHistory1576171192660 } from 'migration/1576171192660-create-table-user-history';

import * as ormOptions from './config/ormconfig';
import { AccountModule } from './account/account.module';
import { MonsterModule } from './monster/monster.module';

@Module({
  imports: [
    ApmModule,
    JsonplaceholderModule,
    MonsterModule,
    ConfigModule,
    UserModule,
    AccountModule,
    TypeOrmModule.forRoot(ormOptions),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   // inject: [ConfigService],
    //   useFactory: () => ({
    //     ...ormOptions,
    //     entities: [User, UserHistory],
    //     subscribers: [UserSubscriber],
    //     synchronize: false,
    //     migrationsRun: true,
    //     migrations: [
    //       CreateTableUser1576160977698,
    //       CreateTableUserHistory1576171192660,
    //     ],
    //   }),
    // }),
  ],
  controllers: [AppController],
})
export class AppModule {}
