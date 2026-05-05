import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserBadge, UserRole } from 'src/enums/user.enum';
import { AuthUser } from 'src/types/auth.user';
import cloudinary, { uploadToCloudinary } from 'src/utils/cloudinary';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { Reply, ReplyDocument } from 'src/schemas/reply.schema';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { Rating, RatingDocument } from 'src/schemas/rating.schema';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import {
  Notification,
  NotificationDocument,
} from 'src/schemas/notification.schema';
import { SkillsProjects } from 'src/enums/project.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
    @InjectModel(Reply.name)
    private readonly replyModel: Model<ReplyDocument>,
  ) {}

  async updateProfile(
    user: AuthUser,
    avatar?: Express.Multer.File,
    body?: Partial<User>,
  ) {
    const updatedData: Partial<User> = {
      jobTitle: body?.jobTitle,
      level: body?.level,
      bio: body?.bio,
      web: body?.web,
      phoneNumber: body?.phoneNumber,
    };

    if (body?.skills) {
      const validSkills = Object.values(SkillsProjects);

      for (const skill of body.skills) {
        if (!validSkills.includes(skill as SkillsProjects)) {
          throw new BadRequestException(`Invalid Skill: ${skill}`);
        }
      }

      updatedData.skills = body.skills;
    }

    if (body?.socials) {
      updatedData.socials = {
        instagram: body.socials.instagram,
        github: body.socials.github,
        youtube: body.socials.youtube,
        facebook: body.socials.facebook,
        linkedin: body.socials.linkedin,
      };
    }

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key as keyof User] === undefined) {
        delete updatedData[key as keyof User];
      }
    });

    if (avatar) {
      if (user.avatar?.includes('res.cloudinary.com')) {
        const publicId = user.avatar.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.v2.uploader.destroy(`users/avatars/${publicId}`);
        }
      }

      const upload = await uploadToCloudinary(avatar, 'users/avatars');
      updatedData.avatar = upload.secure_url;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      updatedData,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      success: 'Profile updated successfully',
      user: updatedUser,
    };
  }

  async getAllUsers(userId: string) {
    return await this.userModel
      .find({ _id: { $ne: userId } })
      .sort({ createdAt: -1 })
      .lean();
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async deleteUser(authUser: AuthUser, userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isAdmin) {
      throw new ForbiddenException('Admin only');
    }

    await this.commentModel.deleteMany({ userId: user._id });
    await this.messageModel.deleteMany({ userId: user._id });
    await this.notificationModel.deleteMany({ userId: user._id });
    await this.postModel.deleteMany({ userId: user._id });
    await this.projectModel.deleteMany({ userId: user._id });
    await this.ratingModel.deleteMany({ userId: user._id });
    await this.replyModel.deleteMany({ userId: user._id });

    await user.deleteOne();

    return { success: 'User deleted successfully' };
  }

  async updateUserBadge(
    adminUserId: string,
    targetUserId: string,
    badge: UserBadge,
  ) {
    const adminUser = await this.userModel.findById(adminUserId);
    if (!adminUser) throw new NotFoundException('Admin user not found');
    if (adminUser.role !== UserRole.ADMIN)
      throw new UnauthorizedException('Only admin can update user badge');

    const targetUser = await this.userModel.findById(targetUserId);
    if (!targetUser) throw new NotFoundException('Target user not found');

    targetUser.badge = badge;
    await targetUser.save();

    return {
      success: `User ${targetUser.fullname} badge updated successfully`,
      badge: targetUser.badge,
    };
  }
}
