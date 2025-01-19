import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WebsocketModule } from '@app/nestjs-websockets';

@Module({
  imports: [

    // Import WebsocketModule without register, you must import it on any other module to use it on the module
    //WebsocketModule,

    // Import WebsocketMoudle with register method to use it globally in the application
    WebsocketModule.register(),
  ],
  providers: [AppService],
})

export class AppModule {}
