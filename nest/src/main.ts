import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TokenService } from './token/token.service';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { AuthSocketAdapter } from './socket/socket.adapter';
import { FRONTEND_URL } from './url';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.use(cookieParser());

  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
  });

  const tokenService = app.get(TokenService);
  app.useWebSocketAdapter(new AuthSocketAdapter(app, tokenService));

  await app.listen(process.env.PORT || 5000);
  console.log(`Server running on port ${process.env.PORT}`);
}
bootstrap();