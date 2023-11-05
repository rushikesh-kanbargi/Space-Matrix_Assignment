import { Component, EventEmitter, Input } from '@angular/core';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() title: string;
}
