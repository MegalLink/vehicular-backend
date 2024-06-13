import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
  })
  email: string;
  @Prop({})
  password: string;
  @Prop({})
  userName: string;
  @Prop({
    default: ['user'],
  })
  roles: string[];
  @Prop({ default: true })
  isActive: boolean;
  @Prop({ default: false })
  isEmailConfirmed: boolean;
  @Prop()
  confirmationToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
