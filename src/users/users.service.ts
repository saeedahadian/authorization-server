import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 0,
        username: 'saeed',
        password: 'asdF123$',
      },
      {
        userId: 1,
        username: 'hamid',
        password: 'jkl:789)',
      },
      {
        userId: 2,
        username: 'ahmad',
        password: 'asdF123$',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
