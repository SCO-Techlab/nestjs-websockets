import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { WebsocketGateway } from './websocket.gateway';

@Injectable()
export class WebsocketService {
  constructor(private readonly websocketGateway: WebsocketGateway) {}

  public get server(): Server {
    return this.websocketGateway.server;
  }

  public get clients(): Socket[] {
    return this.websocketGateway.clients;
  }

  public client(id: string): Socket {
    if (this.clients.length <= 0) return undefined;
    const exist_client: Socket = this.clients.find((client: Socket) => client.id == id);
    return exist_client ? exist_client : undefined;
  }

  emit(event: string, args?: any[]): boolean {
    try {
      this.server.emit(event, args && args.length > 0 ? args : true);
      return true;
    } catch (error) {
      console.error(`[WebsocketService - emit] Error sending event '${event}': ${error}`);
      return false;
    }
  }

  handleConnection(): Observable<Socket> {
    return this.websocketGateway.connectionSubject.asObservable();
  }

  handleDisconnect(): Observable<Socket> {
    return this.websocketGateway.disconnectionSubject.asObservable();
  }
}
