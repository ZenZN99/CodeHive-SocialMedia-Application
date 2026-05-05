import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReplyService } from 'src/services/reply.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/replies')
@UseGuards(AuthGuard)
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Get(':commentId')
  getRepliesByComment(@Param('commentId') commentId: string) {
    return this.replyService.getRepliesByComment(commentId);
  }

  @Post(':commentId')
  createReply(
    @Req() req: RequestWithUser,
    @Body('text') text: string,
    @Param('commentId') commentId: string,
  ) {
    return this.replyService.createReply(req.user._id, text, commentId);
  }

  @Delete(':replyId')
  deleteReply(@Req() req: RequestWithUser, @Param('replyId') replyId: string) {
    return this.replyService.deleteReply(req.user, replyId);
  }
}
