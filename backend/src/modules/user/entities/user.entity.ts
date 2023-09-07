import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema({ collection: 'users', timestamps: true })
export class UserEntity extends Document {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: String, select: false, default: '111111' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
