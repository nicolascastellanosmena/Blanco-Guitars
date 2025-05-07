/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AccesoriosService } from './accesorios.service';
import { AccesoriosController } from './accesorios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Accesorio, AccesorioSchema } from './entities/accesorio.entity';
@Module({
  imports: [MongooseModule.forFeature([{name: Accesorio.name, schema: AccesorioSchema}])],
  controllers: [AccesoriosController],
  providers: [AccesoriosService],
})
export class AccesoriosModule {}
