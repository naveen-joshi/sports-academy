import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public UserForm!: FormGroup;
  public userId = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    let user = this.location.getState();

    this.UserForm = this.fb.group({
      name: ['John', [Validators.required]],
      fatherName: ['John', [Validators.required]],
      motherName: ['John', [Validators.required]],
      dob: ['05/06/2018'],
      gender: ['M'],
      address: ['Phalodi'],
      mobile: ['8787878787'],
      branch: ['phalodi'],
      branchCode: ['PH'],
      date: [new Date().toLocaleDateString()],
      activities: ['karate'],
    });

    if (this.userId) {
      this.UserForm.patchValue(user);
    }
  }

  onSubmit() {
    let form = this.UserForm.getRawValue();
    console.log(form);
    this.userService
      .create(form)
      .then(() => {
        console.log('Created new item successfully!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
