import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SparePart extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  code: string;
  @Prop({})
  name: string;
  @Prop({})
  description: string;
  @Prop({})
  price: number;
  @Prop({})
  images: string[];
  @Prop({})
  category: string;
  @Prop({})
  stock: number;
  @Prop({})
  brand: string;
  @Prop({})
  part_model: string;
  @Prop({})
  year: string;
}

export const SparePartSchema = SchemaFactory.createForClass(SparePart);
