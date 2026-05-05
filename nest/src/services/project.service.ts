import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRole } from 'src/enums/user.enum';
import { Project, ProjectDocument } from 'src/schemas/project.schema';
import { Rating, RatingDocument } from 'src/schemas/rating.schema';
import { AuthUser } from 'src/types/auth.user';
import { uploadToCloudinary } from 'src/utils/cloudinary';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
  ) {}

  async createProject(
    userId: string,
    images: Express.Multer.File[],
    data: Project,
  ) {
    const { title, description, skills, level, linkGitHub, linkDemo } = data;

    if (!title || !description || !level) {
      throw new BadRequestException('All fields are required');
    }

    if (!skills || skills.length === 0) {
      throw new BadRequestException('Skills is required');
    }

    if (!images || images.length === 0) {
      throw new BadRequestException('At least one image is required');
    }

    const imagesUrls: string[] = [];

    for (const image of images) {
      const result = await uploadToCloudinary(image, 'projects');
      imagesUrls.push(result.secure_url);
    }

    const newProject = await this.projectModel.create({
      images: imagesUrls,
      title,
      description,
      skills,
      level,
      linkDemo,
      linkGitHub,
      userId,
    });

    return newProject;
  }

  async updateProject(
    authUser: AuthUser,
    projectId: string,
    data: Project,
    images?: Express.Multer.File[],
  ) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found!');
    }

    const isOwner = project.userId.toString() === authUser._id.toString();
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not allowed!');
    }

    if (images && images.length > 0) {
      const imagesUrls: string[] = [];
      for (const image of images) {
        const result = await uploadToCloudinary(image, 'projects');
        imagesUrls.push(result.secure_url);
      }
      project.images = imagesUrls;
    }

    Object.assign(project, data);
    await project.save();

    return { success: 'Project updated successfully', project };
  }

  async deleteProject(authUser: AuthUser, projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found!');
    }

    const isOwner = project.userId.toString() === authUser._id.toString();
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not allowed!');
    }

    await this.ratingModel.deleteMany({ projectId: project._id });

    await project.deleteOne();

    return { success: 'Project deleted successfully' };
  }

  async getAllProjects() {
    const projects = await this.projectModel
      .find()
      .sort({ createdAt: -1 })
      .populate('userId', 'fullname email avatar')
      .lean();
    return projects;
  }

  async getProjectById(projectId: string) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found!');
    }
    return project;
  }

  async getUserProjects(userId: string) {
    const projects = await this.projectModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean()
      .populate('userId', 'fullname email avatar');
    return projects;
  }
}
