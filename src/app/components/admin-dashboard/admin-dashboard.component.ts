import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

const User_Data = [
  {
    name: 'John',
    fatherName: 'A',
    motherName: 'B',
    dob: '05/06/2018',
    gender: 'M',
    address: 'Phalodi',
    mobile: '8787878787',
    branch: 'phalodi',
    branchCode: 'PH',
    date: new Date().toLocaleDateString(),
    activities: ['karate'],
  },
  {
    name: 'Doe',
    fatherName: 'A',
    motherName: 'B',
    dob: '05/06/2018',
    gender: 'M',
    address: 'Phalodi',
    mobile: '8787878787',
    branch: 'phalodi',
    branchCode: 'PH',
    date: new Date().toLocaleDateString(),
    activities: ['karate'],
  },
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  public filteredUsers: any[] = [];
  public showModal = false;
  public users: any[] = User_Data;
  searchValue: string = '';
  private searchSubject: Subject<string> = new Subject<string>();

  masterSelected: boolean = false;
  checklist: any;
  checkedList: any;

  ngOnInit(): void {
    this.filteredUsers = this.users;
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.filterData(value);
      });
    this.checkUncheckAll();
  }

  openModal() {
    this.showModal = true;
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
  }

  filterData(value: string) {
    this.filteredUsers = [];

    if (value) {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  checkUncheckAll() {
    let users = [...this.filteredUsers];
    let newUsers: any[] = [];

    users.forEach((user) => {
      user = { ...user, isSelected: false };
      newUsers.push(user);
    });

    for (var i = 0; i < newUsers.length; i++) {
      newUsers[i].isSelected = this.masterSelected;
    }
  }

  isAllSelected() {}

  getCheckedItemList() {}
}
