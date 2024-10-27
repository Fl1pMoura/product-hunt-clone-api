import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString({ message: 'O nome não pode ser um numeral' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsString({ message: 'Email inválido' })
  @IsNotEmpty({ message: 'Insira um email' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @IsString({ message: 'Senha inválida' })
  @IsNotEmpty({ message: 'Insira uma senha' })
  @MinLength(8, { message: 'Senha deve conter no mínimo 8 caracteres' })
  password: string;
}
