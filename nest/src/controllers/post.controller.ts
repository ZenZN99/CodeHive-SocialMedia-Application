import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostService } from 'src/services/post.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/posts')
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':postId')
  getPostById(@Param('postId') postId: string) {
    return this.postService.getPostById(postId);
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('user/:userId')
  getUserPosts(@Param('userId') userId: string) {
    return this.postService.getUserPosts(userId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Req() req: RequestWithUser,
    @Body('content') content: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.createPost(req.user._id.toString(), content, file);
  }

  @Put(':postId')
  @UseInterceptors(FileInterceptor('image'))
  updatePost(
    @Req() req: RequestWithUser,
    @Param('postId') postId: string,
    @Body('content') content: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.updatePost(req.user, postId, content, file);
  }

  @Delete(':postId')
  deletePost(@Req() req: RequestWithUser, @Param('postId') postId) {
    return this.postService.deletePost(req.user, postId);
  }
}
