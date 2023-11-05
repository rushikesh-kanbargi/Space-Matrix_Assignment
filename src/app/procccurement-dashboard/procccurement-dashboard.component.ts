import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Details } from '../modals/details';
import { DataService } from '../data.service';

@Component({
  selector: 'app-procccurement-dashboard',
  templateUrl: './procccurement-dashboard.component.html',
  styleUrls: ['./procccurement-dashboard.component.css']
})
export class ProcccurementDashboardComponent {

  details: Details[] = [];

  searchText: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchDetails()

    setInterval(() => {
      this.fetchDetails();
    }, 1000);
  }

  onFetchDetails() {
    this.fetchDetails()
  }

  private fetchDetails() {
    this.dataService.fetchDetails().subscribe(details => { this.details = details; });
  }
  approve(id: any) {
    let currentitem = (this.details.find((p => { return p.id == id })));
    currentitem.status = 'Closed';
    this.dataService.approve(id, currentitem);
  }

  reject(id: any) {
    let currentitem = (this.details.find((p => { return p.id == id })));
    currentitem.status = 'Validate Again';
    this.dataService.approve(id, currentitem);
  }

  filterTableData() {
    return this.details.filter((detail) => {
      const search = this.searchText.toLowerCase();
      return (
        // (detail.status === 'Approved') &&
        detail.itemName.toLowerCase().includes(search) ||
        detail.itemDescription.toLowerCase().includes(search) ||
        detail.itemPrice.toString().includes(search) ||
        detail.quantity.toString().includes(search) ||
        detail.status.toLowerCase().includes(search)
      );
    });
  }
}
