import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../users.interface';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {

  usersList!: User[] //no initializer, pb ?

  constructor(
    // private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.getUsers()
    .subscribe(usersList => this.usersList = usersList)
  }

}
