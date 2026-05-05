import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { User } from './user.schema';
import { Types } from 'mongoose';

export type ReplyDocument = Reply & Document;

@Schema({ timestamps: true })
export class Reply {
  @Prop({
    type: String,
    required: true,
  })
  text!: string;

  @Prop({
    type: String,
    required: true,
    ref: Comment.name,
  })
  commentId!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    ref: User.name,
  })
  userId!: Types.ObjectId;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
