import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BrandModel extends Document {
  @Prop()
  name: string;

  @Prop()
  brandId: string;

  @Prop()
  description: string;
}

export const BrandModelSchema = SchemaFactory.createForClass(BrandModel);

// Crear un índice compuesto para que el nombre sea único solo dentro de una marca
BrandModelSchema.index({ name: 1, brandId: 1 }, { unique: true, background: true });
