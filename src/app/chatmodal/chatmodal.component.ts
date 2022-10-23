import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Message} from "../model/Message";

@Component({
  selector: 'app-chatmodal',
  templateUrl: './chatmodal.component.html',
  styleUrls: ['./chatmodal.component.scss']
})
export class ChatmodalComponent implements OnInit {
  modalRef?: BsModalRef;
  chat!:Array<Message>

  constructor(private modalService: BsModalService) {
    this.chat=[new Message("bot","Hi,How can I help you?"),
      new Message("user","What are trains between rabat and fez?"),
      new Message("bot","There is one line which is AL ATLAS."),
      new Message("user","Okay give me list")
    ]
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class: 'modal-dialog-centered'})
  }

  ngOnInit(): void {
  }


  sendMessage(msg:any){
    this.chat.push(new Message("user",msg.value))
    msg.value =""
  }

}
