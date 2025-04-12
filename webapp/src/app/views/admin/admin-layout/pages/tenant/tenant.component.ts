import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.sass']
})
export class TenantComponent implements OnInit {
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
