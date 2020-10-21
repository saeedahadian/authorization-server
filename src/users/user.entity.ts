import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
    unique: true,
  })
  username: string;

  @Column({
    select: false, // Don't show this column on queries.
  })
  password: string;

  @Column('simple-array')
  roles: string[];
}
