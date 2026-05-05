import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { uploadToCloudinary } from 'src/utils/cloudinary';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async sendMessage(
    senderId: Types.ObjectId,
    data: Message,
    file: Express.Multer.File,
  ) {
    const { receiverId, content } = data;

    if (!receiverId) {
      throw new BadRequestException('ReceiverId is required');
    }

    if ((!content || content.trim() === '') && !file) {
      throw new BadRequestException(
        'Message must contain text or at least one image',
      );
    }

    let imageUrl = '';
    if (file) {
      const uploadResult = await uploadToCloudinary(file, 'messages');
      imageUrl = uploadResult.secure_url;
    }

    const newMessage = await this.messageModel.create({
      senderId,
      receiverId,
      content: content || '',
      image: imageUrl,
      isRead: false,
    });

    if (receiverId !== senderId) {
      await this.notificationService.createNotification({
        receiverId,
        senderId,
        type: NotificationType.MESSAGE,
        targetId: newMessage._id,
        isRead: false,
      });
    }

    return {
      success: 'Message sent successfully',
      message: newMessage,
    };
  }

  async getChatMessages(senderId: string, receiverId: string) {
    const messages = await this.messageModel
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort({ createdAt: 1 });

    return messages;
  }

  async deleteMessage(userId: string, messageId: string) {
    const deletedMessage = await this.messageModel.findByIdAndDelete({
      _id: messageId,
      senderId: userId,
    });

    if (!deletedMessage) {
      throw new BadRequestException('Message not found!');
    }

    return {
      success: 'Message deleted successfully',
      message: deletedMessage,
    };
  }

  async markMessageAsRead(userId: string, senderId: string) {
    const result = await this.messageModel.updateMany(
      {
        senderId: senderId,
        receiverId: userId,
        isRead: false,
      },
      {
        $set: { isRead: true },
      },
    );

    return {
      success: 'Messages marked as read successfully',
      modifiedCount: result.modifiedCount,
    };
  }
}
