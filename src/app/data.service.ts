import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Details } from './modals/details';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient){}

  createDetail(details: Details) {
    this.http.post("https://spacematrix-b7a0f-default-rtdb.firebaseio.com/details.json", details).subscribe(data=>{console.log(data);})
  }

  fetchDetails(){
    return this.http.get<{[key: string]: Details}>("https://spacematrix-b7a0f-default-rtdb.firebaseio.com/details.json").pipe(map(res => {
      let details = [];
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          if (typeof res[key] === 'object') {
            details.push({...res[key], id: key});
          }
        }
      }
      return details;
    }))
  }

  deleteDetail(id: string) {
    return this.http.delete(`https://spacematrix-b7a0f-default-rtdb.firebaseio.com/details/${id}.json`).subscribe();
  }

  updateDetail(id: any, value: any) {
    this.http.put(`https://spacematrix-b7a0f-default-rtdb.firebaseio.com/details/${id}.json`, value).subscribe();
  }

  approve(id: string, value: any) {
    this.http.put(`https://spacematrix-b7a0f-default-rtdb.firebaseio.com/details/${id}.json`, value). subscribe();
  }
}
