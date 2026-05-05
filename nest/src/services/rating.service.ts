import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { Rating, RatingDocument } from 'src/schemas/rating.schema';
import { NotificationService } from './notification.service';
import { NotificationType } from 'src/enums/notification.enum';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async rateProject(userId: string, projectId: string, value: number) {
    if (value < 1 || value > 5) {
      throw new BadRequestException('Rating must be between 1 and 5 stars');
    }

    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found!');
    }

    const existingRating = await this.ratingModel
      .findOne({ userId, projectId })
      .exec();

    if (existingRating) {
      throw new BadRequestException('You have already evaluated a project');
    }

    const rating = await this.ratingModel.create({
      userId,
      projectId: project._id,
      value,
    });

    const userObjectId = new Types.ObjectId(userId);

    if (project.userId.toString() !== userId.toString()) {
      await this.notificationService.createNotification({
        receiverId: project.userId,
        senderId: userObjectId,
        type: NotificationType.RATING,
        targetId: rating._id,
        isRead: false,
      });
    }

    return rating;
  }

  async getProjectRating(projectId: string): Promise<{
    average: number;
    count: number;
    userRatings: any[];
  }> {
    const ratings = await this.ratingModel
      .find({ projectId: new Types.ObjectId(projectId) })
      .populate('userId', 'fullname avatar')
      .exec();

    if (ratings.length === 0) {
      return { average: 0, count: 0, userRatings: [] };
    }

    const total = ratings.reduce((sum, r) => sum + r.value, 0);
    const average = Number((total / ratings.length).toFixed(1));

    const userRatings = ratings.map((r) => {
      const user = r.userId as unknown as {
        _id: string;
        fullname: string;
        avatar: string;
      };
      return {
        _id: r._id,
        userId: user._id,
        fullname: user.fullname,
        avatar: user.avatar,
        value: r.value,
      };
    });

    return {
      average,
      count: ratings.length,
      userRatings,
    };
  }
}
