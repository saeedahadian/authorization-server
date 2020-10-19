import { Controller, Post, HttpCode, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'User was authenticated successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'User credentials are not valid.',
  })
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
}
