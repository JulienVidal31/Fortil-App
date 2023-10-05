import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { environment } from 'environement';
import { AnnoncesModule } from './module/annonces/annonces.module';
import { UploadsModule } from './module/uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: 'postgres', //pq marche pas en process.env
      password: 'juju3.1IUT', //pq marche pas en process.env
      database: process.env.POSTGRES_DATABASE,
      synchronize: true, //false en production
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    AnnoncesModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
