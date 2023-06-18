import {
  Component,
  ViewChild,
  TemplateRef,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss'],
})
export class TabContainerComponent {
  @ViewChild('tabContent', { read: ViewContainerRef })
  tabContent!: ViewContainerRef;

  tabs: Tab[] = [
    { title: 'Tab 1', component: AdminDashboardComponent },
    { title: 'Tab 2', component: AddUserComponent },
    // Add more tabs and their respective components here
  ];

  selectedTab: number = 0;

  selectTab(index: number): void {
    this.selectedTab = index;
    this.loadSelectedTabComponent();
  }

  loadSelectedTabComponent(): void {
    this.tabContent.clear();
    const selectedTab = this.tabs[this.selectedTab];
    const componentRef = this.tabContent.createComponent(selectedTab.component);
  }

  ngOnInit() {}
}

interface Tab {
  title: string;
  component: any;
}
