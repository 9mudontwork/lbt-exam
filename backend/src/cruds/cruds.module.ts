import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CrudsService } from './cruds.service';
import { CrudsController } from './cruds.controller';
import { Crud } from '../@typeorm/entities/Curd';

@Module({
  imports: [TypeOrmModule.forFeature([Crud])],
  controllers: [CrudsController],
  providers: [CrudsService],
})
export class CrudsModule {}
