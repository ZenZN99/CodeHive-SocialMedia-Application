import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SkillsProjects } from 'src/enums/project.enum';
import { JobTitle, UserBadge, UserLevel, UserRole } from 'src/enums/user.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  fullname!: string;

  @Prop({
    type: String,
    required: true,
    index: true,
    lowercase: true,
    trim: true,
    unique: true,
  })
  email!: string;

  @Prop({
    type: String,
    required: true,
    minlength: 8,
  })
  password!: string;

  @Prop({
    type: String,
    enum: [UserRole.ADMIN, UserRole.USER],
    default: UserRole.USER,
  })
  role!: UserRole;

  @Prop({
    default:
      'https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg',
  })
  avatar!: string;

  @Prop({ default: "Hello, I'm here ☺️" })
  bio!: string;

  @Prop({ default: 'No personal website' })
  web!: string;

  @Prop({ default: 0 })
  phoneNumber!: number;

  @Prop({ enum: Object.values(UserLevel), default: UserLevel.JUNIOR })
  level!: UserLevel;

  @Prop({ enum: Object.values(JobTitle), default: JobTitle.NONE })
  jobTitle!: JobTitle;

  @Prop({
    enum: Object.values(UserBadge),
    default: [UserBadge.BEGINNER],
  })
  badge!: UserBadge;

  @Prop({
    type: [String],
    enum: Object.values(SkillsProjects),
    default: [],
  })
  skills!: SkillsProjects[];

  @Prop({
    type: {
      instagram: { type: String },
      github: { type: String },
      youtube: { type: String },
      facebook: { type: String },
      linkedin: { type: String },
    },
    default: {},
  })
  socials!: {
    instagram?: string;
    github?: string;
    youtube?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
