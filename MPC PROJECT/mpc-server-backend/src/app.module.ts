import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './services/config.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
