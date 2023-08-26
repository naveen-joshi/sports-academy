import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  constructor(private dialog: MatDialog) {}

  registerUser() {
    this.dialog
      .open(AddUserComponent, { minWidth: '300px' })
      .afterClosed()
      .subscribe((data) => {
        console.log('closed', data);
      });
  }
}
