import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class BrandModel extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({})
  brandName: string;
}

export const BrandModelSchema = SchemaFactory.createForClass(BrandModel);
