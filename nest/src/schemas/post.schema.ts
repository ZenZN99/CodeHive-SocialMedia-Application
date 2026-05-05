import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    type: String,
    required: true,
  })
  content!: string;

  @Prop({
    type: String,
    required: true,
  })
  image!: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  userId!: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
