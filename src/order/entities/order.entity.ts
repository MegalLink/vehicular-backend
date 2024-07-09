import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  orderID: string;
  @Prop({})
  userID: string;
  @Prop({})
  userDetailID: string;
  @Prop({ default: 0 })
  totalPrice: number;
  @Prop({
    type: [
      {
        code: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String, required: false },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  })
  items: {
    code: string;
    name: string;
    price: string;
    description: string;
    quantity: number;
  }[];
  @Prop({})
  createdAt: Date;
  @Prop({})
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
