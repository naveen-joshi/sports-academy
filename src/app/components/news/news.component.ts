import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsEventModalComponent } from '../modals/news-event.modal';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public news: any[] = [];

  constructor(
    public dialog: MatDialog,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getNews(); 
  }
  
  addNews() {
    const dialogRef = this.dialog.open(NewsEventModalComponent, {
      minWidth: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getNews();
    });
  }

  getNews() {
    this.categoryService.getNews().subscribe((data) => {
      this.news = data;
      console.log(this.news);
    })
  }
}
