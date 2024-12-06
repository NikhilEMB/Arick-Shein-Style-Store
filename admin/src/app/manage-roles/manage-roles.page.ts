import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.page.html',
  styleUrls: ['./manage-roles.page.scss'],
})
export class ManageRolesPage implements OnInit {
  users = [
    {
      name:"Dinesh Chauhan",
      number: '9818913424',
      status:true,
      roles:[
        {
        role:"Reports",
        status: true
       },
       {
        role:"Orders",
        status: true
       },
       {
        role:"Produt",
        status: true
       }
    ]
    },
    {
      name:"Dinesh Chauhan",
      number: '9818913424',
      status:true,
      roles:[
        {
        role:"Reports",
        status: true
       },
       {
        role:"Orders",
        status: true
       },
       {
        role:"Produt",
        status: true
       }
    ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
