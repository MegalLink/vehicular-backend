import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BrandModelType extends Document {
  @Prop({
    index: true
  })
  name: string;

  @Prop({
    index: true
  })
  modelId: string;
}

export const BrandModelTypeSchema =
  SchemaFactory.createForClass(BrandModelType);

// Crear un índice compuesto para que el nombre sea único solo dentro de un modelo y año específico
BrandModelTypeSchema.index({ name: 1, modelId: 1, year: 1 }, { unique: true });
