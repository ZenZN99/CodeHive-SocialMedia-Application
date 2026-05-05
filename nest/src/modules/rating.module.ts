import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingController } from 'src/controllers/rating.controller';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Rating, RatingSchema } from 'src/schemas/rating.schema';
import { RatingService } from 'src/services/rating.service';
import { TokenModule } from 'src/token/token.module';
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
