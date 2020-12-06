import { ServiceMonsterMessageEntity } from '../../database/entities/servicemonster.message.entity';
import { RepositoriesService } from './repositories.service';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ServiceMonsterMessageEntity])],
  providers: [RepositoriesService],
  exports: [RepositoriesService],
})
export class RepositoriesModule {}
