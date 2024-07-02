import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class BrandModelType extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({})
  modelName: string;
}

export const BrandModelTypeSchema =
  SchemaFactory.createForClass(BrandModelType);
