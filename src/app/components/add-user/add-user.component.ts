import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public UserForm!: FormGroup;
  public pageTitle!: string;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let user = this.data;

    if (user) {
      this.pageTitle = user.name;
    } else {
      this.pageTitle = 'Create New User';
    }

    this.UserForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z .]+$/)]],
      fatherName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z .]+$/)],
      ],
      motherName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z .]+$/)],
      ],
      dob: ['', Validators.required],
      gender: ['', [Validators.required]],
      address: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z .-\/]+$/)],
      ],
      mobile: [
        '',
        [Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/)],
      ],
      branch: ['phalodi'],
      branchCode: ['PH'],
      date: [new Date().toLocaleDateString()],
      activities: [null, Validators.required],
    });

    if (user) {
      this.UserForm.patchValue(user);
    }
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.UserForm.controls;
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
