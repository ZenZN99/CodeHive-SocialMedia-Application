import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { CommentModule } from './modules/comment.module';
import { MessageModule } from './modules/message.module';
import { NotificationModule } from './modules/notification.module';
import { PostModule } from './modules/post.module';
import { ProjectModule } from './modules/project.module';
import { RatingModule } from './modules/rating.module';
import { ReplyModule } from './modules/reply.module';
import { UserModule } from './modules/user.module';
import { RedisModule } from './redis/redis.module';
import { ChatGateway } from './gateways/chat.gateway';
import { NotificationGateway } from './gateways/notification.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    AuthModule,
    CommentModule,
    MessageModule,
    NotificationModule,
    PostModule,
    ProjectModule,
    RatingModule,
    ReplyModule,
    UserModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, NotificationGateway],
})
export class AppModule {}
