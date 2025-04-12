import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Listing } from 'src/app/models/listing.model';
import { User } from 'src/app/models/user.model';
import { ListingService } from 'src/app/services/listing.service';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { UploadListingsComponent } from './components/upload-listings/upload-listings.component';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.sass']
})
export class ListingComponent implements OnInit {
  pageSizeOptions=[8,16,24,32]
  total=0;
  pageSize=8;
  pageIndex=1;

  listings: Listing[] = [];
  users: User[] = [];
  
  constructor(private listingService: ListingService, private drawerService: NzDrawerService,private modalService: NzModalService) {
    this.loadDataFromServer(this.pageIndex, this.pageSize, '', '', {})
  }

  ngOnInit(): void {

  }

  loadDataFromServer(pageIndex: number, pageSize: number, sortField?: any, sortOrder?: any, filter = {}) {
    this.listingService.filter({ limit: pageSize, page: pageIndex - 1  }).subscribe({
      next: (res) => {
        this.listings = res.data as Listing[];
        this.total = res.pagination?.total ?? 0;
      },
      error: (err) => {}
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.pageIndex = pageIndex;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  addListing(): void {
    const drawerRef = this.drawerService.create<AddListingComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzWidth: '50%',
      nzContent: AddListingComponent,
      nzContentParams: {
        value: ""
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'object' && this.pageIndex == 1) {
        this.listings.pop();
        this.listings = [data, ...this.listings];
      }
    });

  }

  importListings(): void {
    this.modalService.create({
      nzTitle: 'Upload Listings',
      nzContent: UploadListingsComponent,
      nzFooter: null,
    });
  }

}
