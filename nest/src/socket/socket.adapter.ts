import { IoAdapter } from '@nestjs/platform-socket.io';
import { TokenService } from 'src/token/token.service';
import { Server, Socket } from 'socket.io';
import { INestApplication } from '@nestjs/common';
import * as cookie from 'cookie';
import { FRONTEND_URL } from 'src/url';
export class AuthSocketAdapter extends IoAdapter {
  constructor(
    app: INestApplication,
    private tokenService: TokenService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: any): Server {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: FRONTEND_URL,
        credentials: true,
      },
    });

    server.use((socket: Socket, next) => {
      try {
        const cookies = socket.handshake.headers.cookie;

        if (!cookies) return next(new Error('No cookies'));

        const parsed = cookie.parse(cookies);
        const token = parsed.token;

        if (!token) return next(new Error('Unauthorized'));

        const payload = this.tokenService.verifyToken(token);
        socket.data.user = payload;

        next();
      } catch {
        next(new Error('Unauthorized'));
      }
    });

    return server;
  }
}
