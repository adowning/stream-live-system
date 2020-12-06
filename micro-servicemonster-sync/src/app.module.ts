import { RepositoriesModule } from './core/repositories/repositories.module';
import { HttpErrorFilter } from './shared/http.error.filter';
import { ServiceMonsterModule } from './core/servicemonster/servicemonster.module';
import * as ormOptions from './config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepositoriesModule,
    ServiceMonsterModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
