import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public firebaseAuth: AngularFireAuth,
    private route: Router
  ) {}

  ngOnInit() {
    // let user = localStorage.getItem('user');
    // if (user !== null) {
    //   if (JSON.parse(user).email) {
    //     this.route.navigate(['/admin-dashboard']);
    //   }
    // }
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    let form = this.loginForm.getRawValue();
    this.firebaseAuth
      .signInWithEmailAndPassword(form.email, form.password)
      .then((data) => {
        console.log(data);
        this.isLoggedIn = true;
        // localStorage.setItem('user', JSON.stringify(data.user));
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    // localStorage.removeItem('user');
  }
}
