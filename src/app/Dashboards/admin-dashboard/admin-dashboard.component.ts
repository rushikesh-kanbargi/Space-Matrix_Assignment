import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { NgForm } from '@angular/forms';
import { Details } from '../../modals/details';
import { interval } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  details: Details[] = [];
  editMode: boolean = false;
  currentId: string;
  initialStatus: string = "Pending";
  searchText: string = '';
  validationMessage: string = '';
  isValid: boolean = false;

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
    if(details.itemName !== "" && details.itemDescription !== "" && details.itemPrice !== "" && details.quantity !== ""){
      if (!this.editMode) {
        this.dataService.createDetail(details)
      } else {
        this.dataService.updateDetail(this.currentId, details)
      }
      this.resetForm()
      this.isValid = false;
    } else {
      this.validationMessage = "Please complete the form by providing all required details.";
      this.isValid = true;
    }
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
    this.dataService.editData(this.details, this.currentId, this.form)
  }

  resetForm() {
    this.editMode = false;
    this.isValid = false;
    this.dataService.resetData(this.form)
  }

  filterTableData() {
    return this.dataService.filterData(this.details, this.searchText)
  }

  approve(id: any) {
    this.currentId = id;
    let currentitem = (this.details.find((p => { return p.id == id })));
    currentitem.status = 'Approved';
    this.dataService.approve(id, currentitem);
  }

  reject(id: any) {
    this.currentId = id;
    let currentitem = (this.details.find((p => { return p.id == id })));
    currentitem.status = 'Rejected';
    this.dataService.approve(id, currentitem);
  }
}
