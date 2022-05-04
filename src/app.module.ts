import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      database: process.env.TYPEORM_DATABASE,
      password: process.env.TYPEORM_PASSWORD,
      entities: [],
      logging: false,
      cli: {
        migrationsDir: 'src/database/migrations',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
