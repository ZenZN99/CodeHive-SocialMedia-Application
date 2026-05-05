import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { SkillsProjects } from 'src/enums/project.enum';
import { UserLevel } from 'src/enums/user.enum';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({
    type: String,
    required: true,
  })
  title!: string;

  @Prop({
    type: String,
    required: true,
  })
  description!: string;

  @Prop({
    type: [String],
    required: true,
  })
  images!: string[];

  @Prop({
    type: [String],
    required: true,
    maxLength: 5,
    enum: Object.values(SkillsProjects),
  })
  skills!: SkillsProjects[];

  @Prop({
    type: String,
    required: true,
    enum: Object.values(UserLevel),
    default: UserLevel.JUNIOR,
  })
  level!: UserLevel;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  userId!: Types.ObjectId;

  @Prop()
  linkDemo?: string;

  @Prop()
  linkGitHub?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
