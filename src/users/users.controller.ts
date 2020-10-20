import { Controller, Get, Req, UseGuards, UseFilters } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthorizationExceptionFilter } from '../exceptions/authorization-exception.filter';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @UseFilters(AuthorizationExceptionFilter)
  async getProfile(@Req() req): Promise<any> {
    return req.user;
  }
}
