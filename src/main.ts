import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication } from '@nestjs/common';
import { WebsocketAdapter } from '@app/nestjs-websockets';
import { AppModule } from './app.module';

async function bootstrap() {

  const app: INestApplication = await NestFactory.create(AppModule, 
    { 
      logger: new Logger(),
    }
  );

  app.useWebSocketAdapter(new WebsocketAdapter(app));

  await app.listen(3005);
  console.log(`[App] App started in 'http://localhost:3005'`);
}
bootstrap();