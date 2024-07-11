import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from '../enum/order.enum';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  orderID: string;
  @Prop({})
  userID: string;
  @Prop({
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      identityDocumentNumber: { type: String, required: true },
      identityDocumentType: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      phone: { type: String, required: true },
    },
    required: true,
  })
  userDetail: {
    firstName: string;
    lastName: string;
    identityDocumentNumber: string;
    identityDocumentType: string;
    address: string;
    postalCode: string;
    city: string;
    province: string;
    phone: string;
  };
  @Prop({ default: 0 })
  totalPrice: number;
  @Prop({
    default: 'Not paid',
  })
  paymentStatus: string;
  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
  @Prop({
    type: [
      {
        code: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: false },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  })
  items: {
    code: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
  }[];
  @Prop({})
  createdAt: Date;
  @Prop({})
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
