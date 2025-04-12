import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { AddSubscriptionComponent } from '../subscription/components/add-subscription/add-subscription.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass']
})
export class TransactionComponent implements OnInit {
  pageSizeOptions=[8,16,24,32]
  total=0;
  pageSize=8;
  pageIndex=1;

  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService, private drawerService: NzDrawerService,private modalService: NzModalService) { 
    this.loadDataFromServer(this.pageIndex, this.pageSize, '', '', {})
  }

  ngOnInit(): void {
  }

  loadDataFromServer(pageIndex: number, pageSize: number, sortField?: any, sortOrder?: any, filter = {}) {
    this.transactionService.filter({ limit: pageSize, page: pageIndex - 1  }).subscribe({
      next: (res) => {
        console.log(res)
        this.transactions = res.data as Transaction[] | any;
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
