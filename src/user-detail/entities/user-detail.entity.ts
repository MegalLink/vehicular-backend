import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserDetail extends Document {
  @Prop({ index: true })
  userID: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  identityDocumentNumber: string;

  @Prop()
  identityDocumentType: string;

  @Prop()
  address: string;

  @Prop()
  postalCode: string;

  @Prop()
  city: string;

  @Prop()
  province: string;

  @Prop()
  phone: string;
}

export const UserDetailSchema = SchemaFactory.createForClass(UserDetail);
