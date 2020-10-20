import {
  Controller,
  Post,
  Get,
  Req,
  Param,
  Body,
  UseGuards,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiBasicAuth,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthExceptionFilter } from '../exceptions/jwt-auth-exception.filter';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.usersService.create(createUserDto);
      return {
        status: 'success',
        description: 'A new user was successfully created.',
        user,
      };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException({
          status: 'failure',
          description: 'Username already exists.',
        });
      }
    }
  }

  @Get()
  async findAll(): Promise<any> {
    const users = await this.usersService.findAll();
    return {
      status: 'success',
      description: 'A list of all users successfully retrieved.',
      users,
    };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The id of the target user.',
    type: String,
  })
  async findOne(@Param('id') userId): Promise<any> {
    const user = await this.usersService.findOne(userId);
    return {
      status: 'success',
      description: 'A single user successfully retrieved.',
      user,
    };
  }

  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @UseFilters(JwtAuthExceptionFilter)
  async getProfile(@Req() req): Promise<any> {
    return req.user;
  }
}
