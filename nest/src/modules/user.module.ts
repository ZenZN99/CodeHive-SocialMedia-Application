import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/user.controller';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import {
  Notification,
  NotificationSchema,
} from 'src/schemas/notification.schema';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Rating, RatingSchema } from 'src/schemas/rating.schema';
import { Reply, ReplySchema } from 'src/schemas/reply.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
