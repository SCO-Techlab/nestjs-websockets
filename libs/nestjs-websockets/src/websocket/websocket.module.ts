import { DynamicModule, Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { WebsocketService } from "./websocket.service";
import { WebsocketClientsManagerService } from "./websocket.clients.manager.service";

@Module({
  providers: [
    WebsocketGateway,
    WebsocketService,
    WebsocketClientsManagerService,
  ],
  exports: [
    WebsocketService,
  ],
})
export class WebsocketModule {
  
  static register(): DynamicModule {
    return {
      module: WebsocketModule,
      providers: [
        WebsocketGateway,
        WebsocketService,
        WebsocketClientsManagerService,
      ],
      exports: [
        WebsocketService,
      ],
      global: true,
    };
  }
}
