import { RepositoriesService } from '../../repositories/repositories.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SaveServiceMonsterMessageService {
  constructor(private repoService: RepositoriesService) {}

  @RabbitSubscribe({
    exchange: 'servicemonster-message',
    routingKey: '',
    queue: 'micro-live-servicemonster/servicemonster-message',
  })
  public async rpcHandler(message) {
    const obj = this.repoService.serviceMonsterRepository.create({
      content: message.content,
      user_name: message.user_name,
      email: message.email,
      live_slug: message.live_slug,
      is_broadcaster: message.is_broadcaster,
    });
    await this.repoService.serviceMonsterRepository.save(obj);
  }
}
