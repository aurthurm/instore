import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { SubscriptionTypeService } from 'src/app/services/subscription-type.service';

@Component({
  selector: 'app-add-subscription-type',
  templateUrl: './add-subscription-type.component.html',
  styleUrls: ['./add-subscription-type.component.sass']
})
export class AddSubscriptionTypeComponent implements OnInit {
  form!: FormGroup;
  userTypes = ['tenant', 'advertiser'];

  constructor(private subscriptionTypeService: SubscriptionTypeService, private drawerRef: NzDrawerRef<any>, private fb: FormBuilder) { 
    this.form = fb.group({
      id: [''],
      price: [1,Validators.required],
      title: ['',Validators.required],
      days: [0,Validators.required],
      userType: ['',Validators.required],
      description: ['',Validators.required],
      active: [true,Validators.required],
    });
  }

  ngOnInit(): void {
  }

  close(val: any): void {
    this.drawerRef.close(val);
  }

  submitForm() {
    this.subscriptionTypeService.create(this.form.value).subscribe({
      next: (res) => {
        this.close(res.data)
      },
      error: (err) => {}
    })
  }

  resetForm(event: any) {}

}
