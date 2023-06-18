import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  Auth,
  getAuth,
  authState,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public loginForm!: FormGroup;
  // public auth = getAuth();
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router,
    private localStorage: LocalstorageService,
    private auth: Auth
  ) {}

  ngOnInit() {
    let user = this.localStorage.getItem('user');
    if (user !== null) {
      if (JSON.parse(user).email) {
        this.route.navigate(['/admin-landing']);
      }
    }
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    let form = this.loginForm.getRawValue();
    await signInWithEmailAndPassword(this.auth, form.email, form.password).then(
      (data) => {
        this.isLoggedIn = true;
        this.localStorage.setItem('user', JSON.stringify(data.user));
        this.route.navigate(['admin-landing']);
      }
    );
  }
}
