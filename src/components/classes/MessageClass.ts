import { Message } from "@/src/store/interface/message";

export default class MessageClass {
    constructor(private type:string, private receiver:string, private message:string, private timer:number | "none", private active:boolean) {
        (this.type = type),
        (this.receiver = receiver),
        (this.message = message),
        (this.timer = timer),
        (this.active = active);
    }

    getMessage(): Message {
        const message:Message = {
            type: this.type,
            receiver: this.receiver,
            message: this.message,
            timer: this.timer,
            active: this.active
        };
        return message;
    }

    resetMessage(): Message {
        const message:Message = {
            type: "none",
            receiver: "none",
            message: "none",
            timer: "none",
            active: false
        };
        return message
    }
}
