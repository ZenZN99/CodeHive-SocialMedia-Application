import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from 'src/controllers/project.controller';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Rating, RatingSchema } from 'src/schemas/rating.schema';
import { ProjectService } from 'src/services/project.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
    TokenModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
