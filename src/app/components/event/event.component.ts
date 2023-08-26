import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from '../modals/event-modal.component';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public events: any[] = [];
  
  constructor(
    public dialog: MatDialog,
    public categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getEvents();
  }
  
  createEvent() {
    const dialogRef = this.dialog.open(EventModalComponent, {
      minWidth: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getEvents();
    });
  }

  getEvents() {
    this.categoryService.getEvent().subscribe((data) => {
      this.events = data;
      console.log(this.events);
    });
  }
}
