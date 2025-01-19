import { WebsocketModule } from '@app/nestjs-websockets';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
 
@Module({
  imports: [
    //WebsocketModule,
    WebsocketModule.register(),
  ],
  controllers: [

  ],
  providers: [
    AppService,
  ],
})

export class AppModule {}
