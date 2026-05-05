import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  senderId!: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  receiverId!: Types.ObjectId;

  @Prop()
  content!: string;

  @Prop()
  image!: string;

  @Prop({ default: false })
  isRead!: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
