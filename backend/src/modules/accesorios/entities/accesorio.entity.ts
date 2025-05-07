/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Accesorio {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;
}

export const AccesorioSchema = SchemaFactory.createForClass(Accesorio)