import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { UserRoles } from 'src/app/constants/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;
  amenitiesSuggestions = [];
  userRoles = UserRoles;

  constructor(private userService: UserService, private drawerRef: NzDrawerRef<any>, private fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      waBotPhone: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      name: [''],
      roles: ['', [Validators.required]],
      address: ['', [Validators.required]],
      eacNumber: ['', [Validators.required]],
    })
  }

  ngOnInit() {}

  close(val: any): void {
    this.drawerRef.close(val);
  }

  submitForm() {
    this.userService.create(this.form.value).subscribe({
      next: (res) => {
        this.close(res.data)
      },
      error: (err) => {}
    })
  }

  resetForm(event: any) {}
}
