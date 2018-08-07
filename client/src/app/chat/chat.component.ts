import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SessionService } from '../../services/session.service';

@Component({
 selector: 'app-chat',
 templateUrl: './chat.component.html',
 styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

 constructor(public chatService:ChatService, public sessionService:SessionService){

 }

 ngOnInit() {
 }

}
