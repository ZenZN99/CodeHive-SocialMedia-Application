import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from 'src/enums/user.enum';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { Reply, ReplyDocument } from 'src/schemas/reply.schema';
import { AuthUser } from 'src/types/auth.user';
import { uploadToCloudinary } from 'src/utils/cloudinary';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Reply.name) private readonly replyModel: Model<ReplyDocument>,
  ) {}

  async createPost(userId: string, content: string, file: Express.Multer.File) {
    let imageUrl = '';

    if (file) {
      const uploadResult = await uploadToCloudinary(file, 'posts');
      imageUrl = uploadResult.secure_url;
    }

    const createdPost = await this.postModel.create({
      content,
      image: imageUrl,
      userId,
    });

    return createdPost.save();
  }

  async updatePost(
    authUser: AuthUser,
    postId: string,
    content: string,
    file: Express.Multer.File,
  ) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found!');
    }

    const isOwner = post.userId.toString() === authUser._id.toString();
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not allowed');
    }

    if (content) post.content = content;

    if (file) {
      const result = await uploadToCloudinary(file, 'posts');
      post.image = result.secure_url;
    }

    return post.save();
  }

  async deletePost(authUser: AuthUser, postId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found!');
    }

    const isOwner = post.userId.toString() === authUser._id.toString();
    const isAdmin = authUser.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Not allowed');
    }

    await this.commentModel.deleteMany({ postId: post._id });
    await this.replyModel.deleteMany({ postId: post._id });

    await post.deleteOne();

    return { success: 'post deleted successfully' };
  }

  async getAllPosts() {
    const posts = await this.postModel.find().sort({ createdAt: -1 }).lean();
    return posts;
  }

  async getPostById(postId: string) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found!');
    }
    return post;
  }

  async getUserPosts(userId: string) {
    const posts = await this.postModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return posts;
  }
}
