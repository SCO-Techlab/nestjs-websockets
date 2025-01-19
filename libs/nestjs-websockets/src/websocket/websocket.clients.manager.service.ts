import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketClientsManagerService {

  private _clients: Map<string, Socket>;

  constructor() { 
    this._clients = new Map<string, Socket>();
  }

  total(): number {
    if (!this._clients || this._clients.size <= 0) return 0;
    return this._clients.size;
  }

  keys(): string[] {
    if (!this._clients || this._clients.size == 0) return [];
    return Array.from(this._clients.keys());
  }

  exist(name: string): boolean { 
    return this._clients.has(name);
  }

  get(name: string): Socket {
    if (!this.exist(name)) return undefined;
    return this._clients.get(name);
  }

  set(name: string, client: Socket): boolean {
    if (!this._clients) return false;
    this._clients.set(name, client);
    return true;
  }

  delete(name: string): boolean {
    if (!this.exist(name)) return false;
    return this._clients.delete(name);
  }

  values(): Socket[] {
    if (!this._clients || this._clients.size == 0) return [];
    return Array.from(this._clients.values());
  }
}