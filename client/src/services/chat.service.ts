import { Injectable } from "../../node_modules/@angular/core";
import * as io from "socket.io-client";
import { SessionService } from "./session.service";
import { environment } from "../environments/environment";

interface Message {
  origin: string;
  content: string;
}

@Injectable({
  providedIn: "root"
})
export class ChatService {
  url:string = environment.BASEURL;
  socket: SocketIOClient.Socket;
  messages: Array<Message> = [];
  user:any;
  constructor(sessionService: SessionService) {
    sessionService.isLogged().subscribe(user => {
      this.user=user;
      // Connect to websocket for chat
      this.socket = io(`${this.url}`);
      this.socket.on("connect", () => console.log("Connected to WS"));

      // Save messages into array as they arrive from server
      this.socket.on("chatMessageToGuapo", data => {
        console.log(data)
        // Actually push the message when arrives
        this.messages.push({
          origin:data.origin,
          content: data.m
        });
      });
    });
  }

  sendMessage(m: string, origin) {
    console.log(`Sending message -> ${m}`);
    this.socket.emit("chatMessageToGuapo", {m, origin});
    this.messages.push({
      origin: origin,
      content: m
    });
  }
}
