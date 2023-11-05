import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Details } from '../modals/details';
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

  resetData(form: any) {
    return form.setValue({
      itemDescription: '',
      itemName: '',
      itemPrice: '',
      quantity: '',
      status: 'Pending'
    })
  }

  filterData(details: any, searchText: string) {
    return details.filter((detail) => {
      const search = searchText.toLowerCase();
      return (
        detail.itemName.toLowerCase().includes(search) ||
        detail.itemDescription.toLowerCase().includes(search) ||
        detail.itemPrice.toString().includes(search) ||
        detail.quantity.toString().includes(search) ||
        detail.status.toLowerCase().includes(search)
      );
    });
  }

  editData(details: any, id: any, form: any) {
    let currentitem = (details.find((p => { return p.id == id })));
    form.setValue({
      itemDescription: currentitem.itemDescription,
      itemName: currentitem.itemName,
      itemPrice: currentitem.itemPrice,
      quantity: currentitem.quantity,
      status: 'Pending'
    })
  }
}
