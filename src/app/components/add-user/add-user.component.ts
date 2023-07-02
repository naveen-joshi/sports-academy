import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/user.service';

const MAXIMUM_FILE_SIZE = 2 * 1024 * 200;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @ViewChild('myInput') myInputFile!: ElementRef;
  public UserForm!: FormGroup;
  public pageTitle!: string;
  public btnTitle!: string;
  public user: any = {};

  public inputStyle =
    'border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500';
  public labelStyle = 'block mb-2 text-sm font-medium text-white';

  public imgSrc = '';
  public contents = '';
  public logoErrShow = false;
  public dimesionErr = false;
  public invalidFormat = false;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.user = this.data;

    if (this.user) {
      this.pageTitle = this.user.name;
      this.btnTitle = 'Update';
      this.imgSrc = this.user.contents;
    } else {
      this.pageTitle = 'Create New User';
      this.btnTitle = 'Create';
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
      registraionDate: [new Date().toLocaleDateString()],
      activities: [null, Validators.required],
    });

    if (this.user) {
      this.UserForm.patchValue(this.user);
    }
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.UserForm.controls;
  }

  onSubmit() {
    let form = this.UserForm.getRawValue();
    form = { ...form, contents: this.contents };
    this.btnTitle === 'Create' ? this.createUser(form) : this.updateUser(form);
  }

  createUser(form: any) {
    this.userService
      .create(form)
      .then(() => {
        this.dialogRef.close('ok');
        console.log('User Created successfully!');
      })
      .catch((err) => {
        console.log(err);
        this.dialogRef.close();
      });
  }

  updateUser(form: any) {
    this.userService
      .update(this.user.id, form)
      .then(() => {
        console.log('Updated successfully!');
        this.dialogRef.close('ok');
      })
      .catch((err) => {
        console.log(err);
        this.dialogRef.close();
      });
  }

  getImgData(e: any) {
    const fileList = e.target.files[0];
    if (!fileList && this.imgSrc) {
      this.contents = this.imgSrc;
    } else {
      if (fileList.size > MAXIMUM_FILE_SIZE) {
        this.deleteUpload();
        this.logoErrShow = true;
      } else {
        this.logoErrShow = false;
        this.validateImg(fileList);
      }
    }
  }

  validateImg(chooseFile: any): void {
    const imgRgx = new RegExp('image/(jpeg|png)');
    if (imgRgx.test(chooseFile.type)) {
      this.invalidFormat = false;
      this.transformFile(chooseFile);
    } else {
      this.invalidFormat = true;
    }
  }

  transformFile(image: any): void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(image);
    reader.onload = async () => {
      const img = new Image();
      this.imgSrc = this.bufferToBase64(reader.result);
      img.src = 'data:image/jpg;base64,' + this.imgSrc;
      img.onload = () => {
        this.dimesionErr = false;
        this.contents = this.imgSrc;
      };
    };
  }

  bufferToBase64(buffer: any): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
  }

  deleteUpload(): void {
    this.logoErrShow = false;
    this.dimesionErr = false;
    this.imgSrc = '';
    this.myInputFile.nativeElement.value = '';
  }
}
