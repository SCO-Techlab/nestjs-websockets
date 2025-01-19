import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Subject } from 'rxjs';
import { Server, ServerOptions, Socket } from 'socket.io';
import { WebsocketClientsManagerService } from './websocket.clients.manager.service';

@Injectable()
@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() private _server: Server;

  private _connectionSubject: Subject<Socket>;
  private _disconnectionSubject: Subject<Socket>;

  constructor(private readonly managerService: WebsocketClientsManagerService) {
    this._connectionSubject = new Subject<Socket>();
    this._disconnectionSubject = new Subject<Socket>();
  }

  public get server(): Server {
    return this._server;
  }

  public get connectionSubject(): Subject<Socket> {
    return this._connectionSubject;
  }

  public get disconnectionSubject(): Subject<Socket> {
    return this._disconnectionSubject;
  }

  public get clients(): Socket[] {
    return this.managerService.values();
  }

  // This method is necessary to correctly implement 'OnGatewayInit'
  async afterInit(server: Server, options?: ServerOptions) {
    // This timeout only has the purpose of coordinating the initial log with the Nest message of load
    // After the successful load of Nest message 'Nest application successfully started'
    setTimeout(() => {
      console.log(`[WebsocketGateway] Websocket started on port: ${this._server.httpServer.address()['port']}`);
    }, 1);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    if (this.managerService.exist(client.id)) {
      this.managerService.delete(client.id);
    }

    this._disconnectionSubject.next(client);
  }

  async handleConnection(client: Socket): Promise<void> {
    if (!this.managerService.exist(client.id)) {
      this.managerService.set(client.id, client);
    }

    this._connectionSubject.next(client);
  }
}
