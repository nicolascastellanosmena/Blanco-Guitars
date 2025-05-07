import { PartialType } from '@nestjs/mapped-types';
import { CreateGuitarraDto } from './create-guitarra.dto';

export class UpdateGuitarraDto extends PartialType(CreateGuitarraDto) {}
