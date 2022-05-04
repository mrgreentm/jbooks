import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString({ message: 'O campo nome deve ser do tipo TEXTO!' })
  @IsOptional()
  name: string;

  @IsEmail({ message: 'Insira um e-mail válido!' })
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString({
    message: 'Sua senha DEVE conter letras, número e caracteres especiais!',
  })
  password: string;
}
