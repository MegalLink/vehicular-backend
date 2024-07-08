import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserDetail extends Document {
  @Prop({ index: true })
  userID: string;
  @Prop({})
  fullName: string;
  @Prop({})
  identityDocumentNumber: string;
  @Prop({})
  identityDocumentType: string;
  @Prop({})
  address: string;
  @Prop({})
  email: string;
  @Prop({})
  postCode: string;
  @Prop({})
  city: string;
  @Prop({})
  country: string;
  @Prop({})
  phone: string;
  @Prop({})
  createdAt: Date;
  @Prop({})
  updatedAt: Date;
}

export const UserDetailSchema = SchemaFactory.createForClass(UserDetail);
