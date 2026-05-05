import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from './post.schema';
import { User } from './user.schema';
import { Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({
    type: String,
    required: true,
  })
  text!: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Post.name,
  })
  postId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  userId!: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
