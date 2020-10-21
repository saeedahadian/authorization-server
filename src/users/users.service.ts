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
    // Set the role on 'user' by default.
    user.roles = ['user'];

    return this.usersRepository.insert(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new NotFoundException({
        status: 'failure',
        description: 'No user with given username was found.',
      });
    } else {
      return user;
    }
  }

  async checkPassword(username: string, password: string): Promise<User | boolean> {
    const user = await this.usersRepository.findOne({ username, password });
    if (!user) {
      return false;
    } else {
      return user;
    }
  }
}
