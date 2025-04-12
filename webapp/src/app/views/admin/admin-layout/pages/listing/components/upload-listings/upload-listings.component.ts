import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { Listing } from 'src/app/models/listing.model';
import { User } from 'src/app/models/user.model';
import { ListingService } from 'src/app/services/listing.service';
import { UserService } from 'src/app/services/user.service';
import { read, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-upload-listings',
  templateUrl: './upload-listings.component.html',
  styleUrls: ['./upload-listings.component.sass']
})
export class UploadListingsComponent implements OnInit {
  targetAdvertiser!: User;
  advertiserConfrimed = false;
  loading = false;
  listingsToUpload: Listing[] = [];
  users: User[] = [];

  constructor(private msg: NzMessageService, private listingService: ListingService, private modalRef: NzModalRef, private userService: UserService) {

    this.userService.get().subscribe({
      next: (res: any) => {
        this.users = res.data
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  ngOnInit(): void {}

  confirmAdvertiser(e: any): void {
    if(e.target.value === this.targetAdvertiser.firstName || e.target.value === this.targetAdvertiser.waBotPhone){
      this.advertiserConfrimed = true;
    } else {
      this.advertiserConfrimed = false;
    }
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
  new Observable((observer: Observer<boolean>) => {
    const isExcel = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'].includes(file.type!);
    if (!isExcel) {
      this.msg.error('You can only upload CSV,XLS, XLSX files');
      observer.complete();
      return;
    }

    let files:any =[..._fileList]

    const fr = new FileReader();
    fr.readAsArrayBuffer(files[0])
    fr.onload = (d:any)=>{
      const wb = read(d.target.result);
      this.listingsToUpload = utils.sheet_to_json<Listing>(wb.Sheets[wb.SheetNames[0]]);
      this.listingsToUpload = [...new Map(this.listingsToUpload.map((item: any) => [item["listingReference"], item])).values()];
    }
  
    this.msg.info('We are processing');
    observer.next(false);
    observer.complete();
  });

  save() {
    this.loading = true;
    this.listingsToUpload = this.listingsToUpload.map((item: Listing) => {
      item.advertiserId = this.targetAdvertiser._id!;
      return item;
    });
    this.listingService.bulkCreate(this.listingsToUpload).subscribe({
      next: (result) => { 
        this.loading = false;
        this.msg.info(`Listings uploaded`);
      },
      error: (err) => {this.loading = false; console.log(err)}
    })
    this.modalRef.destroy();
  }
}
