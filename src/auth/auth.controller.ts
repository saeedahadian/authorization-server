import {
  Controller,
  Post,
  HttpCode,
  Req,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { BasicAuthGuard } from './guards/basic-auth.guard';
import {
  ApiTags,
  ApiBasicAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthExceptionFilter } from '../common/filters/local-auth-exception.filter';
import { BasicAuthExceptionFilter } from '../common/filters/basic-auth-exception.filter';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBasicAuth()
  @Post('login')
  // @UseGuards(LocalAuthGuard)
  @UseGuards(BasicAuthGuard)
  @UseFilters(BasicAuthExceptionFilter)
  @HttpCode(200)
  @ApiOkResponse({
    description: 'User was authenticated successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'User credentials are not valid.',
  })
  async login(@Req() req) {
    const data = await this.authService.login(req.user);
    return {
      status: 'success',
      description: 'User logged in successfully.',
      data,
    };
  }
}
