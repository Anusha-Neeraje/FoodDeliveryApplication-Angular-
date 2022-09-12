import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Feedback, Restaurent, User } from '../model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
constructor(private httpClient: HttpClient) { }

adduser = (data: any)=>{
  debugger;
  const header=new HttpHeaders();
  header.set('Content-Type',"application/json");
  header.set('Access-Control-Allow-Origin','*');
  return this.httpClient.post('http://localhost:8080/user',data,{headers:header});
  
 }

 postRestaurant=(data:any)=>{
  debugger;
  const header=new HttpHeaders();
  header.set('Content-Type',"application/json");
  header.set('Access-Control-Allow-Origin','*');
  return this.httpClient.post("http://localhost:8080/restaurent",data,{headers:header});
}

postFeedback=(data:any)=>{
  debugger;
  const header=new HttpHeaders();
  header.set('Content-Type',"application/json");
  header.set('Access-Control-Allow-Origin','*');
  return this.httpClient.post("http://localhost:8080/feedback",data,{headers:header});
}

loginUser=(data: any)=>{
  console.log(data);
  debugger;
  const header=new HttpHeaders();
  header.set('Content-Type',"application/json");
  header.set('Access-Control-Allow-Origin','*');
  return this.httpClient.post('http://localhost:8080/login',data,{headers:header});
}

getRestaurents(){
  console.log('Test Call');
  return this.httpClient.get<Restaurent[]>('http://localhost:8080/all');
}

updateRestaurant(data:any){
  debugger;
  const header=new HttpHeaders();
  header.set('Content-Type',"application/json");
  header.set('Access-Control-Allow-Origin','*');
  return this.httpClient.put("http://localhost:8080/update",data,{headers:header});
}

updatePassword(data:any){
  debugger;
  const header=new HttpHeaders();
  header.set('Content-Type',"application/json");
  header.set('Access-Control-Allow-Origin','*');
  return this.httpClient.put("http://localhost:8080/updatePassword",data,{headers:header});

}

deleteRestaurant(id:number){
  debugger;
  return this.httpClient.delete<any>("http://localhost:8080/delete/"+id).pipe(map((res:any)=>{
      return res;
}))
}

funcOTP=(data:any)=>{
  console.log(data);
  debugger;
  const header=new HttpHeaders();
  header.set('Content-Type',"application/json");
  header.set('Access-Control-Allow-Origin','*');
  return this.httpClient.post('http://localhost:8080/forgotPass',data,{headers:header});
}

}
