import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRole } from 'src/enums/user.enum';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Reply, ReplyDocument } from 'src/schemas/reply.schema';
import { AuthUser } from 'src/types/auth.user';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class ReplyService {
  constructor(
    @InjectModel(Reply.name) private readonly replyModel: Model<ReplyDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async createReply(userId: Types.ObjectId, text: string, commentId: string) {
    if (!text || text.trim() === '') {
      throw new BadRequestException('Reply text is required');
    }

    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found!');
    }

    const newReply = await this.replyModel.create({
      text,
      commentId: comment._id.toString(),
      userId,
    });

    if (comment.userId !== userId) {
      await this.notificationService.createNotification({
        receiverId: comment.userId,
        senderId: userId,
        type: NotificationType.REPLY,
        targetId: newReply._id,
        isRead: false,
      });
    }

    return newReply;
  }

  async deleteReply(authUser: AuthUser, replyId: string) {
    const reply = await this.replyModel.findById(replyId);
    if (!reply) {
      throw new NotFoundException('Reply not found!');
    }

    const isOwner = reply.userId.toString() === authUser._id.toString();
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not allowed!');
    }

    await reply.deleteOne();

    return { success: 'Reply deleted successfully' };
  }

  async getRepliesByComment(commentId: string) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found!');
    }

    const replies = await this.replyModel
      .find({ commentId: new Types.ObjectId(commentId) })
      .sort({ createdAt: -1 })
      .lean()
      .populate('userId', 'fullname email avatar');

    return {
      success: true,
      count: replies.length,
      replies,
    };
  }
}
