import { Component } from '@angular/core';
import QrCodeWithLogo from 'qrcode-with-logos';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
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
