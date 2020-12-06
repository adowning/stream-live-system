import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import 'dotenv/config';
import { UserHistory } from '../user/entity/user-history.entity';
import { AccountHistory } from '../account/entity/account-history.entity';
import { UserSubscriber } from '../user/user.subscriber';
import { AccountSubscriber } from '../account/account.subscriber';
import { CreateTableUser1576160977698 } from 'migration/1576160977698-create-table-user';
import { CreateTableUserHistory1576171192660 } from 'migration/1576171192660-create-table-user-history';
import { User } from '../user/entity/user.entity';
import { Account } from '../account/entity/account.entity';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, UserHistory, Account, AccountHistory],
  subscribers: [UserSubscriber, AccountSubscriber],
  synchronize: true,
  migrationsRun: false,
  migrations: [
    CreateTableUser1576160977698,
    CreateTableUserHistory1576171192660,
  ],
  // entities: [
  //   path.resolve(__dirname, '..', 'database', 'entities', '*'),
  //   'dist/**/*.entity.js',
  // ],
  // migrations: [path.resolve(__dirname, '../../', 'migration', '*')],
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
  // synchronize: true,
  logging: true,
};

module.exports = options;
