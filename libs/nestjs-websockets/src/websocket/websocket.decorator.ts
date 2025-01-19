import 'reflect-metadata';
import { WebsocketEvent } from './websocket.event';

const decorator_events: WebsocketEvent[] = [];

export function getInitialDecoratorsEvents(): WebsocketEvent[] {
  return decorator_events && decorator_events.length > 0 ? decorator_events : [];
}

export function SubscribeEvent(event: string = undefined): MethodDecorator {
  return (target: Object, methodName: string | symbol, descriptor: PropertyDescriptor) => {
    if (event == undefined) event = '*';
    decorator_events.push({ event, target, methodName });
  };
}