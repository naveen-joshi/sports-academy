import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, signOut } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/local-storage.service';
import { EventModalComponent } from '../modals/event-modal.component';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss'],
})
export class AdminLandingComponent implements OnInit {
  // public auth = getAuth();
  public events: any[] = [];
  public news: any[] = [];

  constructor(
    private localStorage: LocalstorageService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authf: Auth,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) =>
      this.getTab(params['tab'])
    );
  }

  public selectedTab =
    Number(this.activatedRoute.snapshot.paramMap.get('tab')) || 0;
  public hoverLogout =
    'cursor-pointer active text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500';

  activateTab(index: number) {
    this.selectedTab = index;
    this.setQueryParamsOnTab(this.selectedTab);
  }

  logout() {
    signOut(this.authf).then(() => {
      this.localStorage.removeItem('user');
      this.route.navigate(['login']);
    });
  }

  setQueryParamsOnTab(tab: number) {
    switch (tab) {
      case 0: {
        this.route.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { tab: 'dashboard' },
          queryParamsHandling: 'merge',
        });
        break;
      }
      case 1: {
        this.route.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { tab: 'news' },
          queryParamsHandling: 'merge',
        });
        break;
      }
    }
  }

  getTab(tab: string): void {
    switch (tab) {
      case 'dashboard': {
        this.selectedTab = 0;
        break;
      }
      case 'news': {
        this.selectedTab = 1;
        break;
      }
    }
  }
}
