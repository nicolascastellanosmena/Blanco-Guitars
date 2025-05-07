/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccesorioDto } from './dto/create-accesorio.dto';
import { UpdateAccesorioDto } from './dto/update-accesorio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Accesorio } from './entities/accesorio.entity';
import { Model } from 'mongoose';

@Injectable()
export class AccesoriosService {
  constructor(
    @InjectModel(Accesorio.name)
    private readonly accesorioModel: Model<Accesorio>,
  ) {}

  async create(createAccesorioDto: CreateAccesorioDto): Promise<Accesorio> {
    return await this.accesorioModel.create(createAccesorioDto);
  }

  async findAll(): Promise<Accesorio[]> {
    return this.accesorioModel.find().exec();
  }

  async findOne(id: string): Promise<Accesorio> {
    const accesorio = await this.accesorioModel.findById(id).exec();
    if (!accesorio) {
      throw new Error('Guitarra no encontrada');
    }
    return accesorio;
  }

  async update(
    id: string,
    updateAccesorioDto: UpdateAccesorioDto,
  ): Promise<Accesorio> {
    const updateAccesorio = await this.accesorioModel.findById(id).exec();
    if (!updateAccesorio) {
      throw new NotFoundException('Accesorio no encontrado');
    }
    Object.assign(updateAccesorio, updateAccesorioDto);
    await updateAccesorio.save();
    return updateAccesorio;
  }

  async remove(id: string): Promise<Accesorio> {
    // Buscar y eliminar el accesorio
    const accesorio = await this.accesorioModel.findByIdAndDelete(id).exec();
    // Si no se encuentra ela ccesorio con ese id, lanzar un error
    if (!accesorio) {
      throw new NotFoundException(`Guitarra con id ${id} no encontrada`);
    }
    return accesorio; // Devuelve la guitarra eliminada
  }
}
