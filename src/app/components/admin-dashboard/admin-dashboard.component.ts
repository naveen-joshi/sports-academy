import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { LoadingService } from '../loader/loading.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  public filteredUsers: any[] = [];
  public showModal = false;
  public users: any[] = [];
  searchValue: string = '';
  private searchSubject: Subject<string> = new Subject<string>();
  public isFetching: boolean = true;
  public fileName = 'users.xlsx';

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private route: Router
  ) {}

  masterSelected: boolean = false;
  checklist: any;
  checkedList: any;

  ngOnInit(): void {
    this.loadingService.isLoading.next(true);
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
      this.loadingService.isLoading.next(false);
      this.isFetching = false;
    });
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.filterData(value);
      });
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
  }

  filterData(value: string) {
    if (value) {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
  }

  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  viewUser(user: any) {
    this.route.navigate(['add-user', user.id], { state: user });
  }
}
