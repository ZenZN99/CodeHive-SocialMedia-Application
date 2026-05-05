import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from 'src/controllers/notification.controller';
import { RedisModule } from 'src/redis/redis.module';
import {
  Notification,
  NotificationSchema,
} from 'src/schemas/notification.schema';
import { NotificationService } from 'src/services/notification.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    RedisModule,
    TokenModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
