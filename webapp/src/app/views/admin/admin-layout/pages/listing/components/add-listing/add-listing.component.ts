import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { User } from 'src/app/models/user.model';
import { ListingService } from 'src/app/services/listing.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.sass']
})
export class AddListingComponent implements OnInit {
  form!: FormGroup;
  amenitiesSuggestions = [];
  users: User[] = [];

  constructor(private listingService: ListingService, private drawerRef: NzDrawerRef<any>, private fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      id: [''],
      title: ['', [Validators.required]],
      gallery: [''],
      description: ['', [Validators.required]],
      advertiserId: ['', [Validators.required]],
      price: ['', [Validators.required]],
      amenities: [[], [Validators.required]],
      expirationDate: [null, [Validators.required]],
      priority: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      suburb: ['', [Validators.required]],
      street: ['', [Validators.required]],
      subscriptionId: ['', [Validators.required]],
    });
    this.userService.get().subscribe({
      next: (res: any) => {
        this.users = res.data
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  ngOnInit() {}

  close(val: any): void {
    this.drawerRef.close(val);
  }

  submitForm() {
    this.listingService.create(this.form.value).subscribe({
      next: (res) => {
        this.close(res.data)
      },
      error: (err) => {}
    })
  }

  resetForm(event: any) {}
}
