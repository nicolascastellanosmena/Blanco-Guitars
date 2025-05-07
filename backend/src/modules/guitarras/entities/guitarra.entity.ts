/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

/* eslint-disable prettier/prettier */
@Schema()
export class Guitarra {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })  
  image: string[];
}


export const GuitarraSchema = SchemaFactory.createForClass(Guitarra)