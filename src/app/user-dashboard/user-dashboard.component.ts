import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Details } from '../modals/details';
import { NgForm } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  details: Details[] = [];
  editMode: boolean = false;
  currentId: string;
  initialStatus: string = "Pending";

  searchText: string = '';


  @ViewChild('detailsForm') form: NgForm;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchDetails()

    interval(1000).subscribe(() => {
      this.fetchDetails();
    });
  }

  onFetchDetails() {
    this.fetchDetails()
  }

  submitForm(details: any) {
    if (!this.editMode) {
      this.dataService.createDetail(details)
    } else {
      this.dataService.updateDetail(this.currentId, details)
    }

    this.resetForm()
  }

  private fetchDetails() {
    this.dataService.fetchDetails().subscribe(details => { this.details = details; });
  }

  delete(id: any) {
    this.dataService.deleteDetail(id)
  }

  edit(id: any) {
    this.editMode = true;
    this.currentId = id;
    let currentitem = (this.details.find((p => { return p.id == id })));
    this.form.setValue({
      itemDescription: currentitem.itemDescription,
      itemName: currentitem.itemName,
      itemPrice: currentitem.itemPrice,
      quantity: currentitem.quantity,
      status: 'Pending'
    })
  }

  resetForm() {
    this.editMode = false;
    this.form.setValue({
      itemDescription: '',
      itemName: '',
      itemPrice: '',
      quantity: '',
      status: 'Pending'
    })
  }


  filterTableData() {
    return this.details.filter((detail) => {
      const search = this.searchText.toLowerCase();
      return (
        detail.itemName.toLowerCase().includes(search) ||
        detail.itemDescription.toLowerCase().includes(search) ||
        detail.itemPrice.toString().includes(search) ||
        detail.quantity.toString().includes(search) ||
        detail.status.toLowerCase().includes(search)
      );
    });
  }

}
