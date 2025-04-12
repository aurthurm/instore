import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SubscriptionType } from 'src/app/models/subscription-type.model';
import { SubscriptionTypeService } from 'src/app/services/subscription-type.service';
import { AddSubscriptionTypeComponent } from './components/add-subscription-type/add-subscription-type.component';

@Component({
  selector: 'app-subscription-type',
  templateUrl: './subscription-type.component.html',
  styleUrls: ['./subscription-type.component.sass']
})
export class SubscriptionTypeComponent implements OnInit {
  pageSizeOptions=[8,16,24,32]
  total=0;
  pageSize=8;
  pageIndex=1;

  subscriptionTypes: SubscriptionType[] = [];

  constructor(private subscriptionTypeService: SubscriptionTypeService, private drawerService: NzDrawerService,private modalService: NzModalService) { 
    this.loadDataFromServer(this.pageIndex, this.pageSize, '', '', {})
  }

  ngOnInit(): void {
  }

  loadDataFromServer(pageIndex: number, pageSize: number, sortField?: any, sortOrder?: any, filter = {}) {
    this.subscriptionTypeService.filter({ limit: pageSize, page: pageIndex - 1  }).subscribe({
      next: (res) => {
        this.subscriptionTypes = res.data as SubscriptionType[];
        this.total = res.pagination?.total ?? 0;
      },
      error: (err) => {}
    })
  }

  addSubscriptionType(): void {
    const drawerRef = this.drawerService.create<AddSubscriptionTypeComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzWidth: '50%',
      nzContent: AddSubscriptionTypeComponent,
      nzContentParams: {
        value: ""
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
    });
  }

}
