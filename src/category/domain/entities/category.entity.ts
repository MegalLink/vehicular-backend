import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({})
  title: string;
  @Prop({})
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
