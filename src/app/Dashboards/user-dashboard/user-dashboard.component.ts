import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Details } from '../../modals/details';
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
    this.dataService.editData(this.details, this.currentId, this.form)
  }

  resetForm() {
    this.editMode = false;
    this.dataService.resetData(this.form)
  }

  filterTableData() {
    return this.dataService.filterData(this.details, this.searchText)
  }
}
