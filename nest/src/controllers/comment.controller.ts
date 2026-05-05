import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CommentService } from 'src/services/comment.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/comments')
@UseGuards(AuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':postId')
  getCommentsByPost(@Param('postId') postId: string) {
    return this.commentService.getCommentsByPost(postId);
  }

  @Post(':postId')
  createComment(
    @Req() req: RequestWithUser,
    @Body('text') text: string,
    @Param('postId') postId: string,
  ) {
    return this.commentService.createComment(req.user._id, text, postId);
  }

  @Put(':commentId')
  updateComment(
    @Req() req: RequestWithUser,
    @Param('commentId') commentId: string,
    @Body('text') text: string,
  ) {
    return this.commentService.updateComment(req.user, commentId, text);
  }

  @Delete(':commentId')
  deleteComment(
    @Req() req: RequestWithUser,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.deleteComment(req.user, commentId);
  }
}
