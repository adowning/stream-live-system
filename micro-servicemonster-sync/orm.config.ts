import { SnakeNamingStrategy } from './src/core/snake.naming.strategy';

module.exports = {
  type: 'postgres',
  host: '192.168.0.7',
  port: 5432,
  username: 'root',
  password: 'root@123',
  database: 'database',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  seeds: ['/**/*.seed.ts'],
  synchronize: true,
  dropSchema: true,
  // logging: true,
  namingStrategy: new SnakeNamingStrategy(),
};
