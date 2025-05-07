/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GuitarrasService } from './guitarras.service';
import { GuitarrasController } from './guitarras.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Guitarra, GuitarraSchema } from './entities/guitarra.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Guitarra.name, schema: GuitarraSchema}])],
  controllers: [GuitarrasController],
  providers: [GuitarrasService],
  exports: [GuitarrasService, GuitarrasModule]
})
export class GuitarrasModule {}
