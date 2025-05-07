/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuitarraDto } from './dto/create-guitarra.dto';
import { UpdateGuitarraDto } from './dto/update-guitarra.dto';
import { Guitarra } from './entities/guitarra.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GuitarrasService {
  constructor(
    @InjectModel(Guitarra.name)
    private readonly guitarraModel: Model<Guitarra>,
  ) {}

  async create(createGuitarraDto: CreateGuitarraDto): Promise<Guitarra> {
    return await this.guitarraModel.create(createGuitarraDto);
  }

  async findAll(): Promise<Guitarra[]> {
    return await this.guitarraModel.find().exec();
  }

  async findOne(id: string): Promise<Guitarra> {
    const guitarra = await this.guitarraModel.findById(id).exec();
    if (!guitarra) {
      throw new Error('Guitarra no encontrada');
    }
    return guitarra;
  }

  async update(id: string, updateGuitarraDto: UpdateGuitarraDto): Promise<Guitarra> {
    const updateGuitar = await this.guitarraModel.findById(id).exec();
    if (!updateGuitar) {
      throw new NotFoundException('Guitarra no encontrada');
    }
    // Actualizar el objeto guitarra con los datos proporcionados en el DTO
    Object.assign(updateGuitar, updateGuitarraDto);
    // Guardar los cambios
    await updateGuitar.save();
    return updateGuitar; // Devolver el objeto actualizado
  }

  async remove(id: string): Promise<Guitarra> {
    // Buscar y eliminar la guitarra
    const guitarra = await this.guitarraModel.findByIdAndDelete(id).exec();
    // Si no se encuentra la guitarra con ese id, lanzar un error
    if (!guitarra) {
      throw new NotFoundException(`Guitarra con id ${id} no encontrada`);
    }
    return guitarra; // Devuelve la guitarra eliminada
  }
}
