import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from 'src/controllers/comment.controller';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Reply, ReplySchema } from 'src/schemas/reply.schema';
import { CommentService } from 'src/services/comment.service';
import { TokenModule } from 'src/token/token.module';
import { NotificationModule } from './notification.module';
import { Post, PostSchema } from 'src/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    NotificationModule,
    TokenModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
