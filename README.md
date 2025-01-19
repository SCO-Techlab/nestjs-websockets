<p align="center">
  <img src="sco-techlab.png" alt="plot" width="250" />
</p>

## Nest.JS i18n
Nest.JS Websockets is a Websocket gateway module (Clients, events) management for Nest.JS framework.

### Get Started
- Install dependency
<pre>
npm i @sco-techlab/nestjs-websockets && npm i @nestjs/platform-socket.io
</pre>
- Import Websocket module in your 'app.module.ts' file, register or registerAsync methods availables
<pre>
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
</pre>
- You can import the module in global mode, to use trasnalte service only need constructor dependency inyection
- Add your Websocket Adapter to your application in 'main.ts' file
<pre>
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
</pre>


### Service example
<pre>
import { Injectable } from "@nestjs/common";
import { SubscribeEvent, WebsocketService } from "@app/nestjs-websockets";

@Injectable()
export class AppService {

  // Inject the WebsocketService to access the server and clients
  constructor(private readonly websocketService: WebsocketService) {

    // Subscribe to the 'handleConnection' event to get the client sockets
    this.websocketService.handleConnection().subscribe((socket) => {
      console.log(`[handleConnection] Client connected:`, socket['handshake'].headers.origin, socket.id);

      // Subscribe to the 'event_init' event to get the client sockets
      this.websocketService.client(socket.id).on('event_init', (data: any[]) => {
        console.log(`[handleConnection - onClient] Event received from client '${socket.id}':`, data);
      });
    });

    // Subscribe to the 'handleDisconnect' event to get the client sockets
    this.websocketService.handleDisconnect().subscribe((socket) => {
      console.log(`[handleDisconnect] Client disconnected:`, socket['handshake'].headers.origin);
    });
  }

  // Use decorator to subscribe a event emited by one client
  @SubscribeEvent('event_init')
  handleEventInit(event: string, client: string, args?: any[]): void {
    console.log(`[WebsocketGateway - handleEventInit] Event '${event}' received from client '${client}':`, args);
    return;
  }

  // Use decorator to subscribe on any event emited by any clients, example 1
  @SubscribeEvent()
  handleGlobalOne(event: string, client: string, args?: any[]): void {
    console.log(`[WebsocketGateway - handleGlobalOne] Event '${event}' dispatch on global subscription (1) from client '${client}':`, args);
    return;
  }

  // Use decorator to subscribe on any event emited by any clients, example 2
  @SubscribeEvent()
  handleGlobalTwo(event: string, client: string, args?: any[]): void {
    console.log(`[WebsocketGateway - handleGlobalTwo] Event '${event}' dispatch on global subscription (2) from client '${client}':`, args);
    return;
  }
}
</pre>

## Author
Santiago Comeras Oteo
- <a href="https://web.sco-techlab.es/">SCO Techlab</a>
- <a href="https://github.com/SCO-Techlab">GitHub</a>
- <a href="https://www.npmjs.com/settings/sco-techlab/packages">Npm</a>
- <a href="https://www.linkedin.com/in/santiago-comeras-oteo-4646191b3/">LinkedIn</a>  

<p align="center">
  <img src="sco-techlab.png" alt="plot" width="250" />
</p>