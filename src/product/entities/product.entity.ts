import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({})
  name: string;
  @Prop({})
  description: string;
  @Prop({})
  price: string;
  @Prop({})
  images: string[];
  @Prop({
    index: true,
  })
  category: string;
  @Prop({})
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
