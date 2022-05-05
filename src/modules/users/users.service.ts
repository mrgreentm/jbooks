import { UsersInterface } from './interfaces/users.interface';
import { UsersEntity } from './entities/users.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async findUserByEmail(email: string): Promise<UsersInterface> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: email },
      });
      return user;
    } catch (error) {
      throw new Error(
        'Desculpe, tivemos um erro interno. Por favor, tente novamente mais tarde',
      );
    }
  }

  async findOne(id: number): Promise<UsersInterface> {
    try {
      const user = await this.usersRepository.findOne(id);
      if (!user) {
        throw new NotFoundException('Desculpe, não encontramos esse usuário');
      }
      return user;
    } catch (error) {
      throw new Error(
        'Desculpe, tivemos um erro interno. Por favor, tente novamente mais tarde',
      );
    }
  }
}
