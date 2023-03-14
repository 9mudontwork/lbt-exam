import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CrudsService } from './cruds.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';

@Controller('cruds')
export class CrudsController {
  constructor(private readonly crudsService: CrudsService) {}

  @Post()
  create(@Body() createCrudDto: CreateCrudDto) {
    return this.crudsService.create(createCrudDto);
  }

  @Get()
  findAll() {
    return this.crudsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrudDto: UpdateCrudDto) {
    return this.crudsService.update(+id, updateCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudsService.remove(+id);
  }
}
