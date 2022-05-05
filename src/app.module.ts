import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersEntity } from './modules/users/entities/users.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME || 'root',
      database: process.env.TYPEORM_DATABASE || 'jbooks',
      password: process.env.TYPEORM_PASSWORD || 'admin',
      entities: [UsersEntity],
      synchronize: false,
      logging: false,
      cli: {
        migrationsDir: 'src/database/migrations',
      },
    }),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
