import { Controller, Get, Req, UseGuards, UseFilters } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthExceptionFilter } from '../exceptions/jwt-auth-exception.filter';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtAuthExceptionFilter)
  async getProfile(@Req() req): Promise<any> {
    return req.user;
  }
}
