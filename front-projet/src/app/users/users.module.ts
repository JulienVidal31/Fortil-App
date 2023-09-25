import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { UserTableComponent } from './user-table/user-table.component';



@NgModule({
  declarations: [
    // UserTableComponent, //ko si mis
  ],
  imports: [
    CommonModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
