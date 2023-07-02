import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';
import { SuccessModalComponent } from '../modals/success-modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  public registerForm: FormGroup;
  public success: boolean = false;
  public error: boolean = false;
  public inputStyle =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({
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
  }

  ngOnInit(): void {}

  get controls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit() {
    let form = this.registerForm.getRawValue();
    console.log(form);
    this.userService
      .create(form)
      .then((data) => {
        this.dialog
          .open(SuccessModalComponent)
          .afterClosed()
          .subscribe(() => {});
        this.success = true;
        console.log(data);
      })
      .catch((err) => {
        this.error = true;
        console.log(err);
      });
  }
}
