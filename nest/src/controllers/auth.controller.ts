import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import type { AuthUser } from 'src/types/auth.user';
import { AuthService } from 'src/services/auth.service';
import type { RequestWithUser } from 'src/types/express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: AuthUser, @Res({ passthrough: true }) res: Response) {
    return this.authService.signup(data, res);
  }

  @Post('login')
  login(@Body() data: AuthUser, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(data, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: RequestWithUser) {
    return this.authService.me(req.user._id.toString());
  }
}
