import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,

    /**
     * TODO:
     * Use a separate configuration file to set these values e.g. an
     * environment file. (Also can use ormgconfig.json at root)
     */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'saeed',
      password: 'asdF123$',
      database: 'test_authorization_server',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
