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
import { Post, PostDocument } from 'src/schemas/post.schema';
import { Reply, ReplyDocument } from 'src/schemas/reply.schema';
import { AuthUser } from 'src/types/auth.user';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Reply.name)
    private readonly replyModel: Model<ReplyDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async createComment(userId: Types.ObjectId, text: string, postId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (!text || text.trim() === '') {
      throw new BadRequestException('text comment is required');
    }

    const newComment = await this.commentModel.create({
      text,
      postId: post._id,
      userId,
    });

    if (post.userId !== userId) {
      await this.notificationService.createNotification({
        receiverId: post.userId,
        senderId: userId,
        type: NotificationType.COMMENT,
        targetId: newComment._id,
        isRead: false,
      });
    }

    return newComment;
  }

  async updateComment(authUser: AuthUser, commentId: string, text: string) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const isOwner = comment.userId.toString() === authUser._id.toString();
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not allowed');
    }

    if (!text || text.trim() === '') {
      throw new BadRequestException('text comment is required');
    }

    comment.text = text;

    return await comment.save();
  }

  async deleteComment(authUser: AuthUser, commentId: string) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const isOwner = comment.userId.toString() === authUser._id.toString();
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not allowed');
    }

    await this.replyModel.deleteMany({ commentId: comment._id });

    await comment.deleteOne();

    return { success: 'Comment deleted successfully' };
  }

  async getCommentsByPost(postId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return await this.commentModel
      .find({ postId: new Types.ObjectId(postId) })
      .sort({ createdAt: -1 })
      .populate('userId', 'fullname avatar')
      .lean();
  }
}
