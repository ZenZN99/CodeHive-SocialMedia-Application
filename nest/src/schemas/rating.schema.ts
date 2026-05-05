import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Project } from './project.schema';

export type RatingDocument = Rating & Document;

@Schema({ timestamps: true })
export class Rating {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Project.name,
    required: true,
  })
  projectId!: Types.ObjectId;

  @Prop({
    required: true,
    min: 1,
    max: 5,
  })
  value!: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
