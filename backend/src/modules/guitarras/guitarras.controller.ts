/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuitarrasService } from './guitarras.service';
import { CreateGuitarraDto } from './dto/create-guitarra.dto';
import { UpdateGuitarraDto } from './dto/update-guitarra.dto';

@Controller('guitarras')
export class GuitarrasController {
  constructor(private readonly guitarrasService: GuitarrasService) {}

  @Post()
  async create(@Body() createGuitarraDto: CreateGuitarraDto) {
    return this.guitarrasService.create(createGuitarraDto);
  }

  @Get()
  findAll() {
    return this.guitarrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guitarrasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuitarraDto: UpdateGuitarraDto) {
    return this.guitarrasService.update(id, updateGuitarraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guitarrasService.remove(id);
  }
}
