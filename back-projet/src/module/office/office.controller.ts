import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficesEntity } from './office.entity';

@Controller('offices')
export class OfficeController {
    constructor(private readonly officeService: OfficeService) {}

    @Get()
    async getAllOffices(): Promise<OfficesEntity[]> {
      return this.officeService.getAllOffices();
    }
  
    // @Post(':id/reserve')
    // async reserveOffice(
    //   @Param('id') id: number,
    //   @Body('date') date: string,
    // ): Promise<any> {
    //   return this.officeService.reserveOffice(id, date);
    // }
    
}
