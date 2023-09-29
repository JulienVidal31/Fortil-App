import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserTableComponent } from './user-table/user-table.component';

@NgModule({
  declarations: [
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UsersService]
})
export class UsersModule { }
