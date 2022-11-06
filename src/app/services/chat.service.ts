import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) {}

   getResponse(msg:string):Observable<any>{
    return this.http.get(environment.backendAPI+"results", {params:{"message":msg},responseType:'json'});

    /*.then(
      (response: any) =>{
        console.log(response);
        results.fill(new Results(response.NoTrain,response.departure_station,response.arrival_station,response.departure_time,response.arrival_time,response.duration,response.comment))
      })*/

  }
  getCategory(msg:string):Observable<any>{
    return this.http.get(environment.backendAPI+"chat", {params:{"message":msg},responseType:'json'});

    /*.then(
      (response: any) =>{
        console.log(response);
        results.fill(new Results(response.NoTrain,response.departure_station,response.arrival_station,response.departure_time,response.arrival_time,response.duration,response.comment))
      })*/

  }


}
