import { ServiceMonsterMessageEntity } from '../../database/entities/servicemonster.message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class RepositoriesService {
  public constructor(
    @InjectRepository(ServiceMonsterMessageEntity)
    public serviceMonsterRepository: Repository<ServiceMonsterMessageEntity>,
  ) {}
}
