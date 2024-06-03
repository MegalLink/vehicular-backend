import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Brand extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({})
  models: string[];
  @Prop({})
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
