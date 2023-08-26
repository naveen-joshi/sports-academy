import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import QrCodeWithLogo from 'qrcode-with-logos';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public isVisible: boolean = false;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.url === '/admin-landing'
      ? (this.isVisible = true)
      : (this.isVisible = false);
  }

  downloadQR() {
    new QrCodeWithLogo({
      // canvas: document.getElementById("canvas"),
      content: 'https://www.thesportsacademy.in',
      width: 380,
      download: true,
      // image: document.getElementById("image"),
      logo: {
        src: 'assets/img/logo-2.png',
      },
    }).toImage();
  }
}
