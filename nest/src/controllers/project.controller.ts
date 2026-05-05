import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Project } from 'src/schemas/project.schema';
import { ProjectService } from 'src/services/project.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/projects')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':projectId')
  getProjectById(@Param('projectId') projectId: string) {
    return this.projectService.getProjectById(projectId);
  }

  @Get('me/projects')
  getUserProjects(@Req() req: RequestWithUser) {
    return this.projectService.getUserProjects(req.user._id.toString());
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  createProject(
    @Req() req: RequestWithUser,
    @UploadedFiles() files: { images: Express.Multer.File[] },
    @Body() data: Project,
  ) {
    return this.projectService.createProject(
      req.user._id.toString(),
      files.images,
      data,
    );
  }

  @Put(':projectId')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  updateProject(
    @Req() req: RequestWithUser,
    @Param('projectId') projectId: string,
    @Body() data: Project,
    @UploadedFiles() files: { images: Express.Multer.File[] },
  ) {
    return this.projectService.updateProject(
      req.user,
      projectId,
      data,
      files.images,
    );
  }

  @Delete(':projectId')
  deleteProject(
    @Req() req: RequestWithUser,
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.deleteProject(req.user, projectId);
  }
}
