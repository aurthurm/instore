import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe({next:(data) => console.log(data)})
  }

  ngOnInit(): void {
  }

}
