import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ index: true })
  userID: string;
  @Prop({})
  userDetailID: string;
  @Prop({})
  totalPrice: number;
  @Prop({
    type: [
      {
        sparePartID: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  })
  items: {
    sparePartID: string;
    quantity: number;
  }[];
  @Prop({})
  createdAt: Date;
  @Prop({})
  updatedAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
