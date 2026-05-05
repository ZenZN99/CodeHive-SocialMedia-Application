import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationType } from 'src/enums/notification.enum';
import { User } from './user.schema';
import { Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  receiverId!: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  senderId!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(NotificationType),
  })
  type!: NotificationType;

  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  targetId!: Types.ObjectId;

  @Prop({
    default: false,
  })
  isRead!: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
