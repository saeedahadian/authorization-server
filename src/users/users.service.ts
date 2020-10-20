import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: any): Promise<any> {
    return this.usersRepository.insert(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException({
        status: 'failure',
        description: 'No user with given id was found.',
      });
    } else {
      return user;
    }
  }
}
