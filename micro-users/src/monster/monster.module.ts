import { Module, HttpModule } from '@nestjs/common';
import { MonsterService } from './monster.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.envConfig.monsterTimeout,
        baseURL: configService.envConfig.monsterUrl,
      }),
    }),
  ],
  providers: [MonsterService],
  exports: [MonsterService],
})
export class MonsterModule {}
