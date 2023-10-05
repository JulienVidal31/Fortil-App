import { Module } from '@nestjs/common';
import { AnnoncesController } from './annonces.controller';
import { AnnoncesService } from './annonces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnoncesEntity } from './annonces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnnoncesEntity]),],
  controllers: [AnnoncesController],
  providers: [AnnoncesService]
})
export class AnnoncesModule {}
