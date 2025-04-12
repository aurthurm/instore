import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Role } from 'src/app/constants/constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  role = 'admin';
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NzNotificationService,
    private router: Router
  ) {
    activatedRoute.data.subscribe((result: any) => {
      console.log(result);
      this.role = result.role;
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const { username, password } = this.validateForm.value;
      this.authService.authenticate(username, password, this.role).subscribe({
        next: (result: any) => {
          console.log(result);
          this.authService.Token = result.access_token;
          this.authService.getProfile().subscribe({
            next: (user: any) => {
              this.authService.User = user;
              if (user.roles.includes(Role.SU_ADMIN))
                return this.router.navigateByUrl('/admin');
              return this.router.navigateByUrl('/layout')
            },
            error: (err: any) => { },
          });

          this.notificationService.success('Success', 'login');
        },
        error: (err) => {
          this.notificationService.error('Message', err.message);
        },
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
