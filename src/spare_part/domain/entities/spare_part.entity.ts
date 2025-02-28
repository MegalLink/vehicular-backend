import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
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
  brandModel: string;
  @Prop({})
  modelType: string;
  @Prop({})
  modelTypeYear: string;
  @Prop({})
  createdAt: Date;
  @Prop({})
  updatedAt: Date;
}

export const SparePartSchema = SchemaFactory.createForClass(SparePart);
