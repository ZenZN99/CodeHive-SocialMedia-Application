import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserBadge } from 'src/enums/user.enum';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  updateProfile(
    @Req() req: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: User,
  ) {
    return this.userService.updateProfile(req.user, file, body);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers(@Req() req: RequestWithUser) {
    return this.userService.getAllUsers(req.user._id.toString());
  }

  @Get(':userId')
  @UseGuards(AuthGuard)
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard, AdminGuard)
  deleteUserById(@Req() req: RequestWithUser, @Param('userId') userId: string) {
    return this.userService.deleteUser(req.user, userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  updateUserBadge(
    @Req() req: RequestWithUser,
    @Param('id') targetUserId: string,
    @Body('badge') badge: UserBadge,
  ) {
    return this.userService.updateUserBadge(
      req.user._id.toString(),
      targetUserId,
      badge,
    );
  }
}
