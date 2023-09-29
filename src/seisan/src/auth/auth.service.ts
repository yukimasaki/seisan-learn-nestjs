import { UserOmitPassword, UserResponse } from '@@nest/user/entities/user.entity';
import { UserService } from '@@nest/user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserOmitPassword | null> {
    const user: UserResponse = await this.userService.findOne(email);
    const isMatch: boolean = await bcrypt.compare(password, user.hashedPassword);

    if (user && isMatch) {
      const { hashedPassword, ...userOmitPassword } = user;
      return userOmitPassword;
    }

    return null;
  }
}
