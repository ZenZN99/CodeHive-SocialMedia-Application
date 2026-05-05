import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/controllers/auth.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthService } from 'src/services/auth.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
