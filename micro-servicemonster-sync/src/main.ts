import { RedisIoAdapter } from './core/redis-io-adapter/redis-io.adapter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.SERVER_PORT, () => {
    Logger.log(`Server running on http://localhost:${process.env.SERVER_PORT}`, 'Bootstrap');
  });
}

bootstrap();
