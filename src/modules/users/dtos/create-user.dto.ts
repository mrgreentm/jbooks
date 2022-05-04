import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O campo nome deve ser do tipo TEXTO!' })
  @IsNotEmpty({ message: 'O campo nome não pode ser DE FORMA ALGUMA VAZIO' })
  name: string;

  @IsEmail({ message: 'Insira um e-mail válido!' })
  @IsNotEmpty({ message: 'O campo e-mail não pode ser DE FORMA ALGUMA VAZIO!' })
  email: string;

  @IsNotEmpty({ message: 'O campo senha não pode ser DE FORMA ALGUMA VAZIO!' })
  @IsString({
    message: 'Sua senha DEVE conter letras, número e caracteres especiais!',
  })
  password: string;
}
