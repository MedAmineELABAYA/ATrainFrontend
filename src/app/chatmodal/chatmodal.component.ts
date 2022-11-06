import {AfterViewChecked, Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Message} from "../model/Message";
import {ChatService} from "../services/chat.service";
import {Results} from "../model/Results";

@Component({
  selector: 'app-chatmodal',
  templateUrl: './chatmodal.component.html',
  styleUrls: ['./chatmodal.component.scss']
})
export class ChatmodalComponent implements OnInit,AfterViewChecked {

  modalRef?: BsModalRef;
  chat!:Array<Message>
  results : Array<Results>=[];
  response = new Message("bot","")
  lastmsgcat:string ;

  constructor(private modalService: BsModalService,private chatservice:ChatService) {
    this.chat=[]
    this.lastmsgcat ="greeting"
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class: 'modal-dialog-centered'})
  }

  ngOnInit(): void {
    document.body.style.setProperty('--pointer', "auto");

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(msg:any){
     if (msg.value !== ""){
       this.chat.push(new Message("user", msg.value))
       document.body.style.setProperty('--pointer', "none");
       this.chatservice.getCategory(msg.value).subscribe(
         res => {
           console.log(res);
           this.chat.push(new Message("bot", res.message));
           if (res.category == "trains") {
             res.travelResults.map((restr: any) => {
               let s: string = "Departure Station: " + restr?.departure_station + " - " + restr?.departure_time + "\nArrival Station: " + restr?.arrival_station + " - " + restr?.arrival_time + "\nDuration:" + restr?.duration
               if (restr?.comment !== null) s += "\nN.B :  " + restr?.comment
               this.chat.push(new Message("bot", s));
             })
             document.body.style.setProperty('--pointer', "auto");
           }
         }
       )
       msg.value = ""
       document.body.style.setProperty('--pointer', "auto");
       this.scrollToBottom();

     }
   }
  scrollToBottom(): void {

  }

}
