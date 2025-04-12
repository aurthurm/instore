import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AddUserComponent } from './components/add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  pageSizeOptions=[8,16,24,32]
  total=0;
  pageSize=8;
  pageIndex=1;

  users: User[] = [];
  
  constructor(private userService: UserService, private drawerService: NzDrawerService,private modalService: NzModalService) {
    this.loadDataFromServer(this.pageIndex, this.pageSize, '', '', {})
  }

  ngOnInit(): void {

  }

  loadDataFromServer(pageIndex: number, pageSize: number, sortField?: any, sortOrder?: any, filter = {}) {
    this.userService.filter({ limit: pageSize, page: pageIndex - 1  }).subscribe({
      next: (res) => {
        this.users = res.data as User[];
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

  addUser(): void {
    const drawerRef = this.drawerService.create<AddUserComponent, { value: string }, string>({
      nzTitle: 'Component',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzWidth: '50%',
      nzContent: AddUserComponent,
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
        this.users.pop();
        this.users = [data, ...this.users];
      }
    });

  }


}
