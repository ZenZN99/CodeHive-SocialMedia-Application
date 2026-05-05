import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReplyController } from 'src/controllers/reply.controller';
import { Reply, ReplySchema } from 'src/schemas/reply.schema';
import { ReplyService } from 'src/services/reply.service';
import { TokenModule } from 'src/token/token.module';
import { NotificationModule } from './notification.module';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}
