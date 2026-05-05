import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RatingService } from 'src/services/rating.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/ratings')
@UseGuards(AuthGuard)
export class RatingController {
  constructor(private readonly ratingSerivce: RatingService) {}

  @Get(':projectId')
  getProjectRating(@Param('projectId') projectId: string) {
    return this.ratingSerivce.getProjectRating(projectId);
  }

  @Post(':projectId')
  rateProject(
    @Req() req: RequestWithUser,
    @Param('projectId') projectId: string,
    @Body() body: { value: number },
  ) {
    return this.ratingSerivce.rateProject(
      req.user._id.toString(),
      projectId,
      body.value,
    );
  }
}
