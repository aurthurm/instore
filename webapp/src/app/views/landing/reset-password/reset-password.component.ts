import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    this.loading = true;
    this.authService.resetPassword(this.form.value.email).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
      },
    });
  }
}
