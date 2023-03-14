import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { Crud } from '../@typeorm/entities/Curd';

@Injectable()
export class CrudsService {
  constructor(
    @InjectRepository(Crud)
    private crudsRepository: Repository<Crud>,
  ) {}

  create(createCrudDto: CreateCrudDto) {
    return this.crudsRepository.save(createCrudDto);
  }

  findAll() {
    return this.crudsRepository.find();
  }

  findOne(id: number) {
    return this.crudsRepository.findOneBy({ id });
  }

  update(id: number, updateCrudDto: UpdateCrudDto) {
    return this.crudsRepository.update(id, updateCrudDto);
  }

  remove(id: number) {
    return this.crudsRepository.delete(id);
  }
}
