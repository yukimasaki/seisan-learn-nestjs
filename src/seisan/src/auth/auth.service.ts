import { UserOmitPassword, UserResponse } from '@@nest/user/entities/user.entity';
import { UserService } from '@@nest/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserOmitPassword | null> {
    const user: UserResponse | null = await this.userService.findOne(email);
    if (!user) throw new NotFoundException

    const isMatch: boolean = await bcrypt.compare(password, user.hashedPassword);
    if (user && isMatch) {
      const { hashedPassword, ...userOmitPassword } = user;
      return userOmitPassword;
    }

    return null;
  }

  async login(
    user: {
      email: string,
      password: string,
    }
  ): Promise<string> {
    const payload = {
      userId: user.email,
    }

    return this.jwtService.sign(payload);
  }
}
