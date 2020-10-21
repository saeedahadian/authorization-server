import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.checkPassword(username, pass);

    /**
     * TODO:
     * This is absolutely not the safe way of doing this. Use the
     * "bcrypt" module to hash and validate passwords and never store
     * them directly.
     */

    if (!user) return null;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
