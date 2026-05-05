import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from 'src/controllers/post.controller';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { Reply, ReplySchema } from 'src/schemas/reply.schema';
import { PostService } from 'src/services/post.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
    TokenModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
