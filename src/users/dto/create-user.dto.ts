import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The unique username of the user.',
  })
  username: string;

  @ApiProperty({
    description: 'Password of the user.',
  })
  password: string;
}
