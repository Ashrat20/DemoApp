import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3000/users";
  constructor(private http: HttpClient) {}
  registeruser(userdata: any): Observable<any> {
    return this.http.post(this.url, userdata);
  }

  updateuser(userId:number,userdata:any):Observable<any>{
    return this.http.patch(`${this.url}/${userId}`,userdata);
  }

  getUserById(userId : number): Observable<any> {
    return this.http.get(`${this.url}/${userId}`);
  }
}
