import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { HttpModule, } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([Users]),
    HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
  ],
  controllers: [UsersController],
  providers: [UsersService, GoogleStrategy, JwtService],
})
export class UsersModule {}
