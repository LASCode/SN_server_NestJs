import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class registerRequestData {
  @IsNotEmpty({message: 'Это поле не может быть пустым'})
  @IsString({message: 'Допустим только строковый тип данных.'})
  @MinLength(5, {message: 'Минимальная длина строки 5 символов'})
  @MaxLength(25, {message: 'Максимальная длина строки 25 символов'})
  login: string;
  @IsNotEmpty({message: 'Это поле не может быть пустым'})
  @IsString({message: 'Допустим только строковый тип данных.'})
  @MinLength(5, {message: 'Минимальная длина строки 5 символов'})
  @MaxLength(40, {message: 'Максимальная длина строки 40 символов'})
  password: string;
}