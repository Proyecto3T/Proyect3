import { Injectable } from "../../node_modules/@angular/core";
import * as io from "socket.io-client"

interface Message {
 origin:string;
 content:string;
}

@Injectable({
  providedIn:"root"
})
export class ChatService {

 socket:io.Socket;
 messages:Array<Message> = [];

 constructor(){

   // Connect to websocket for chat
   this.socket = io('localhost:3000');
   this.socket.on('connect',() =>console.log("Connected to WS"));

   // Save messages into array as they arrive from server
   this.socket.on('chatMessageToGuapo',(data) => {
     // Actually push the message when arrives
     this.messages.push({
       origin:'Server',
       content:data
     });
   })

 }

 sendMessage(m:string){
   console.log(`Sending message -> ${m}`);
   this.socket.emit('chatMessageToGuapo', m);
   this.messages.push({
     origin:'Me',
     content:m
   });
 }

}