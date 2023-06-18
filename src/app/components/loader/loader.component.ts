import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
}
