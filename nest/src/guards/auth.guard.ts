import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/token/token.service';
import { AuthUser } from 'src/types/auth.user';

declare global {
  namespace Express {
    interface Request {
      user: AuthUser;
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('No token in cookies');
    }

    const payload = this.tokenService.verifyToken(token);

    if (!payload) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    
    request.user = payload as AuthUser;
    return true;
  }
}
