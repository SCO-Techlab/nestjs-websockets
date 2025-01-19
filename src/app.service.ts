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