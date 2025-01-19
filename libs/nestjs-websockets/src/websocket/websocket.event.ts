export class WebsocketEvent {
    event: string;
    target: Object;
    methodName: string | symbol;

    constructor(event: string, target: Object, methodName: string | symbol) {
        this.event = event;
        this.target = target;
        this.methodName = methodName;
    }
}