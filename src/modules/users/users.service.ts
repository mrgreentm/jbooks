import { UsersInterface } from './interfaces/users.interface';
import { UsersEntity } from './entities/users.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async createUser(data: CreateUserDto): Promise<UsersInterface> {
    try {
      const entity = Object.assign(new UsersEntity(), data);
      await this.usersRepository.save(entity);
      return entity;
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível criar o usuário.' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
