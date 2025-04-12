import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'src/app/models/subscription.model';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { AddSubscriptionComponent } from './components/add-subscription/add-subscription.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass']
})
export class SubscriptionComponent implements OnInit {
  pageSizeOptions=[8,16,24,32]
  total=0;
  pageSize=8;
  pageIndex=1;

  subscriptions: Subscription[] = [];

  constructor(private subscriptionService: SubscriptionService, private drawerService: NzDrawerService,private modalService: NzModalService) { 
    this.loadDataFromServer(this.pageIndex, this.pageSize, '', '', {})
  }

  ngOnInit(): void {
  }

  loadDataFromServer(pageIndex: number, pageSize: number, sortField?: any, sortOrder?: any, filter = {}) {
    this.subscriptionService.filter({ limit: pageSize, page: pageIndex - 1  }).subscribe({
      next: (res) => {
        console.log(res)
        this.subscriptions = res.data as Subscription[] | any;
        this.total = res.pagination?.total ?? 0;
      },
      error: (err) => {}
    })
  }

  addSubscriptionType(): void {
    const drawerRef = this.drawerService.create<AddSubscriptionComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzWidth: '50%',
      nzContent: AddSubscriptionComponent,
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
