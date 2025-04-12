import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { SubscriptionType } from 'src/app/models/subscription-type.model';
import { User } from 'src/app/models/user.model';
import { SubscriptionTypeService } from 'src/app/services/subscription-type.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import { Subscription } from 'src/app/models/subscription.model';


@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSubscriptionComponent implements OnInit {
  transactionForm!: FormGroup;
  selectedTransactionType = 'cash';
  today = new Date();
  endDate = new Date();

  users: User[] = [];
  subscriptionTypes: SubscriptionType[] = [];

  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private subscriptionTypeService: SubscriptionTypeService,
    private drawerRef: NzDrawerRef<any>,
    private fb: FormBuilder
  ) {
    this.userService.get().subscribe({
      next: (res) => {
        this.users = res.data as User[];
      },
    });
    this.subscriptionTypeService.get().subscribe({
      next: (res) => {
        this.subscriptionTypes = res.data as SubscriptionType[];
      },
    });

    this.transactionForm = fb.group({
      amount: [''],
      transactionType: ['cash', Validators.required],
      description: ['subsciption'],
      currency: ['', [Validators.required]],
      phone: [''],
      reference: ['', [Validators.required]],
      user: [''],
      subscription: this.fb.group({
        userId: [1, Validators.required],
        subscriptionType: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.initFormSubscriptions();
  }

  initFormSubscriptions(): void {
    const subForm =  this.getSubscriptiionForm();
    subForm.get('userId')?.valueChanges.subscribe((value) => {
      this.subscriptionService.getActiveSubscription(value).subscribe({
        next: ({ data }: any) => {
          if(data)
          this.endDate = new Date(data?.endDate) ;
          else
          this.endDate = new Date();
          subForm.patchValue({
            startDate: this.endDate,
            // endDate: this.calculateEndDate(this.endDate, 4)
          })
        }
      })
    });

    subForm.get('subscriptionType')?.valueChanges.subscribe((value) => {
      if(!subForm.get('startDate')?.value) return;
      const subType = this.subscriptionTypes.filter(s => s._id === value)[0];
      subForm.patchValue({
        endDate: this.calculateEndDate(this.endDate, subType?.days)
      })
    });

    subForm.get('startDate')?.valueChanges.subscribe((value) => {
      if(!subForm.get('subscriptionType')?.value || !value) return;
      const subType = this.subscriptionTypes.filter(s => s._id === subForm.get('subscriptionType')?.value)[0];
      subForm.patchValue({
        endDate: this.calculateEndDate(value, subType?.days)
      })
    });
  }

  calculateEndDate(startDate: Date, days: number): Date {
    const result = new Date(startDate);
    result.setDate(result.getDate() + days);
    const ndate = new Date(result);
    return ndate;
  }

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.endDate) < 0;

  close(val: any): void {
    this.drawerRef.close(val);
  }

  setTransactionType(value: any): void {
    let phone = this.transactionForm.get('phone');
    phone?.setValidators(null);
    let reference = this.transactionForm.get('reference');
    reference?.setValidators(null);
    let currency = this.transactionForm.get('currency');
    currency?.setValidators(null);

    phone?.setValue(null);
    reference?.setValue(null);
    currency?.setValue(null);
    if (value === 'cash') {
      reference?.setValidators([Validators.required]);
      currency?.setValidators([Validators.required]);
    }
    if (value === 'ecocash') {
      phone?.setValidators([Validators.required]);
    }
    phone?.updateValueAndValidity();
    currency?.updateValueAndValidity();
    reference?.updateValueAndValidity();

    this.selectedTransactionType = value;
  }


  getSubscriptiionForm():FormGroup {
    return (this.transactionForm.get('subscription') as FormGroup) 
  }

  submitForm() {
    this.transactionService.create(this.transactionForm.value).subscribe({
      next: (res) => {
        this.close(res.data);
      },
      error: (err) => {},
    });
  }

  resetForm(event: any) {}
}
