import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Message} from "../model/Message";
import {ChatService} from "../services/chat.service";
import {Results} from "../model/Results";

@Component({
  selector: 'app-chatmodal',
  templateUrl: './chatmodal.component.html',
  styleUrls: ['./chatmodal.component.scss']
})
export class ChatmodalComponent implements OnInit {

  modalRef?: BsModalRef;
  chat!:Array<Message>
  results : Array<Results>=[];
  response = new Message("bot","")
  language:string = "English" ;
  sent:string;

  constructor(private modalService: BsModalService,private chatservice:ChatService) {
    this.chat=[]
    this.sent=""
  }

  changeLanguage(){
    if(this.language == "English") this.language = "Français"
    else this.language = "English"
    console.log(this.language)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class: 'modal-dialog-centered'})
  }

  ngOnInit(): void {
    document.body.style.setProperty('--pointer', "auto");


  }

  async translate(msg:string) {
    if (this.language == "Français"){
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", msg);
      encodedParams.append("target", "fr");
      encodedParams.append("source", "en");

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': 'efc58ef321mshe8bfe437f353fe9p10f673jsna984a3428250',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: encodedParams
      };

      await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(response => response.json())
        .then(response => {
          this.chat.push(new Message("bot", response.data.translations[0].translatedText))
        })
    }
    else {
      this.chat.push(new Message("bot",msg))

    }
  }

  async translateMsg(msg:string) {
    if (this.language == "Français"){
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", msg);
      encodedParams.append("target", "en");
      encodedParams.append("source", "fr");

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': 'efc58ef321mshe8bfe437f353fe9p10f673jsna984a3428250',
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: encodedParams
      };

      await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(response => response.json())
        .then(response => {
          this.sent = response.data.translations[0].translatedText
        })
    }
    else {
      this.sent = msg

    }
  }


  sendMessage(msg:any){
     if (msg.value !== ""){
       this.chat.push(new Message("user", msg.value))
       this.translateMsg(msg.value)
       console.log(this.sent)
       document.body.style.setProperty('--pointer', "none");
       this.chatservice.getCategory(this.sent).subscribe(
         res => {
           console.log(res);
           this.translate(res.message);
           if (res.category == "trains") {
             if(res.travelResults==null){
               this.translate("No AL-BORAQ trains available for you input criteria, please check the ONCF official website.\n www.oncf.ma/en/")
             }
             else{
             res.travelResults.map((restr: any) => {
                 let s: string = "Departure Station: " + restr?.departure_station + " - " + restr?.departure_time + "\nArrival Station: " + restr?.arrival_station + " - " + restr?.arrival_time + "\nDuration:" + this.formatDuration(restr?.duration)
                 if (restr?.comment !== null) s += "\nN.B :  " + restr?.comment
               this.translate(s.toString())
             })
               this.translate("To buy a ticket, check the ONCF VOYAGE website\nwww.oncf-voyages.ma/")}
             document.body.style.setProperty('--pointer', "auto");
           }
         }
       )
       msg.value = ""
       document.body.style.setProperty('--pointer', "auto");

     }
   }


  formatDuration(time:number){
    if(time/60 >0) return Math.floor(time/60) +"h"+time%60+"min"
    return time +"min"
  }
/*
  translate(sourceText:string,targetLanguage:string):any {
    this.translateService.translate(sourceText,targetLanguage).subscribe((response: any) => {
      console.log(response.data.translations[0].translatedText)
    });
  }*/

}
