import { WebsocketService } from "@app/nestjs-websockets";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

    constructor(private readonly websocketService: WebsocketService) {
        this.websocketService.handleConnection().subscribe((socket) => {
            console.log(`[handleConnection] Client connected:`, socket['handshake'].headers.origin, socket.id);
            
            socket.onAny((data) => {
                console.log(`[handleConnection - onAny] Event received from client '${socket.id}':`, data);
            })
        });

        this.websocketService.handleDisconnect().subscribe((socket) => {
            console.log(`[handleDisconnect] Client disconnected:`, socket['handshake'].headers.origin);
        });
    }

}
