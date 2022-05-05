import { AuthDto } from './dtos/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersInterface } from '../users/interfaces/users.interface';
import { AuthTypeInterface } from './dtos/auth-type';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthDto): Promise<AuthTypeInterface> {
    const user = await this.usersService.findUserByEmail(email);
    console.log(user)
    const validPassword = compareSync(password, user.password);

    const token = await this.jwtToken(user);

    if (!validPassword) {
      throw new UnauthorizedException('A senha do usuário está incorreta!');
    }
    return { user, token: token };
  }

  private async jwtToken(user: UsersInterface): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
