import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { JobTitle, UserBadge, UserLevel, UserRole } from 'src/enums/user.enum';
import { Response } from 'express';
import { TokenService } from 'src/token/token.service';
import { AuthUser } from 'src/types/auth.user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly tokenService: TokenService,
  ) {}

  private getCookieOptions(isLogout = false) {
    return {
      httpOnly: true,
      secure: true,
      sameSite: 'none' as const,
      maxAge: isLogout ? 0 : 365 * 24 * 60 * 60 * 1000,
    };
  }

  async signup(data: AuthUser, res: Response) {
    const { fullname, email, password } = data;

    switch (true) {
      case !fullname || !email || !password:
        throw new BadRequestException('All fields are required');
      case !validator.isEmail(email):
        throw new BadRequestException('Invalid Email address');
      case password!.length < 8:
        throw new BadRequestException(
          'Password is too short (minimum 8 characters)',
        );
      case password!.length > 40:
        throw new BadRequestException(
          'Maximum password length is 40 characters',
        );
    }

    const existEmail = await this.userModel.findOne({ email });
    if (existEmail) {
      throw new BadRequestException('Email already registred');
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await this.userModel.create({
      fullname,
      email,
      password: hashed,
      role: UserRole.USER,
      avatar:
        'https://res.cloudinary.com/dgagbheuj/image/upload/v1763194734/avatar-default-image_yc4xy4.jpg',
      bio: "Hello, I'm here ☺️",
      web: 'No personal website',
      phoneNumber: 0,
      level: UserLevel.JUNIOR,
      jobTitle: JobTitle.NONE,
      badge: UserBadge.BEGINNER,
    });

    const token = this.tokenService.generateToken({
      _id: user._id,
      role: user.role,
    });

    res.cookie('token', token, this.getCookieOptions());

    return {
      success: 'Account created successfully',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        web: user.web,
        phoneNumber: user.phoneNumber,
        level: user.level,
        jobTitle: user.jobTitle,
        badge: user.badge,
        skills: user.skills,
      },
    };
  }

  async login(data: AuthUser, res: Response) {
    const { email, password } = data;
    if (!email || !password) {
      throw new BadRequestException('All fields are required');
    }

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Email not registred');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Wrong Password');
    }

    const token = this.tokenService.generateToken({
      _id: user._id,
      role: user.role,
    });

    res.cookie('token', token, this.getCookieOptions());

    return {
      success: 'Logged In  successfully',
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        web: user.web,
        phoneNumber: user.phoneNumber,
        level: user.level,
        jobTitle: user.jobTitle,
        badge: user.badge,
        skills: user.skills,
      },
    };
  }

  async logout(res: Response) {
    res.clearCookie('token', this.getCookieOptions(true));

    return {
      success: 'Logout successful',
    };
  }

  async me(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      web: user.web,
      phoneNumber: user.phoneNumber,
      level: user.level,
      jobTitle: user.jobTitle,
      badge: user.badge,
    };
  }
}
