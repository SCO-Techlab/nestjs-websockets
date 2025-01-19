import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server } from 'socket.io';

export class WebsocketAdapter extends IoAdapter {
    
    constructor(
        private readonly app: INestApplication,
        private options?: Partial<ServerOptions>
    ) {
        super(app);
        this.options = this.options ? this.options : getDefaultOptions();
    }

    createIOServer(port: number, options?: ServerOptions): Server {
        if (this.options.cors && this.options.cors['origin'] && typeof this.options.cors['origin'] === 'string') {
            this.options.cors['origin'] = formatOrigin(this.options.cors['origin']);
        }

        return new Server(this.app.getHttpServer(), this.options);
    }
}

function getDefaultOptions(): Partial<ServerOptions> {
    return { 
        path: "/socket.io/",
        cors: {
          origin: 'http://localhost:4200', 
          methods: ["GET", "POST"],
          credentials: true
        },
        allowEIO3: true,
    } as Partial<ServerOptions>;
}

function formatOrigin(envOrigin: string): string[] {
    if (!envOrigin || envOrigin && envOrigin.length == 0) 
        return ["*"];

    return envOrigin.includes(',') ? envOrigin.split(',') : [envOrigin];
}