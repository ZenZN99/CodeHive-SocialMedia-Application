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
import { Message } from 'src/schemas/message.schema';
import { MessageService } from 'src/services/message.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/messages')
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  sendMessage(
    @Req() req: RequestWithUser,
    @Body() data: Message,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.messageService.sendMessage(req.user._id, data, file);
  }

  @Get(':receiverId')
  getChatMessages(
    @Req() req: RequestWithUser,
    @Param('receiverId') receiverId: string,
  ) {
    return this.messageService.getChatMessages(
      req.user._id.toString(),
      receiverId,
    );
  }

  @Delete(':messageId')
  deleteMessage(
    @Req() req: RequestWithUser,
    @Param('messageId') messageId: string,
  ) {
    return this.messageService.deleteMessage(
      req.user._id.toString(),
      messageId,
    );
  }

  @Put(':senderId')
  markMessageAsRead(
    @Req() req: RequestWithUser,
    @Param('senderId') senderId: string,
  ) {
    return this.messageService.markMessageAsRead(
      req.user._id.toString(),
      senderId,
    );
  }
}
