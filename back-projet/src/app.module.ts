import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { environment } from 'environement';
import { AnnoncesModule } from './module/annonces/annonces.module';
import { UploadsModule } from './module/uploads/uploads.module';
import { AuthModule } from './module/auth/auth.module';
import { UsersService } from './module/users/users.service';
import { MailerModule } from './module/mailer/mailer.module';
import { OfficeModule } from './module/office/office.module';
import { ReservationsModule } from './module/reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER, //pq marche pas en process.env
      password: process.env.POSTGRES_PASSWORD, //pq marche pas en process.env
      database: process.env.POSTGRES_DATABASE,
      synchronize: true, //false en production
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    AnnoncesModule,
    UploadsModule,
    AuthModule,
    MailerModule,
    OfficeModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
