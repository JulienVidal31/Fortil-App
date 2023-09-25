import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../users.interface';

// export interface Person {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
// }

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {

  userList!: User[] //no initializer, pb ?

  constructor(
    // private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(userList => this.userList = userList)
  }

  // listOfData: Person[] = [ //maj avec interface qd ok
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park'
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park'
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park'
  //   }
  // ];


}
