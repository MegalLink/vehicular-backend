import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SparePart extends Document {
  @Prop({})
  name: string;
  @Prop({})
  description: string;
  @Prop({})
  price: number;
  @Prop({})
  images: string[];
  @Prop({
    index: true,
  })
  category: string;
  @Prop({})
  stock: number;
}

export const SparePartSchema = SchemaFactory.createForClass(SparePart);
