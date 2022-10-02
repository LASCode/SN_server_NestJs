import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProfileReq {
  @IsNotEmpty({message: 'Это поле не может быть пустым'})
  @IsString({message: 'Допустим только строковый тип данных.'})
  @MinLength(4, {message: 'Минимальная длина строки 4 символа'})
  @MaxLength(24, {message: 'Максимальная длина строки 24 символа'})
  firstName: string;
  @IsNotEmpty({message: 'Это поле не может быть пустым'})
  @IsString({message: 'Допустим только строковый тип данных.'})
  @MinLength(4, {message: 'Минимальная длина строки 4 символа'})
  @MaxLength(24, {message: 'Максимальная длина строки 24 символа'})
  lastName: string;
  @IsNotEmpty({message: 'Это поле не может быть пустым'})
  @IsString({message: 'Допустим только строковый тип данных.'})
  @MinLength(4, {message: 'Минимальная длина строки 4 символа'})
  @MaxLength(24, {message: 'Максимальная длина строки 24 символа'})
  subName: string;
  @IsNotEmpty({message: 'Это поле не может быть пустым'})
  @IsString({message: 'Допустим только строковый тип данных.'})
  @MinLength(1, {message: 'Минимальная длина строки 1 символ'})
  @MaxLength(70, {message: 'Максимальная длина строки 70 символов'})
  bio: string;
}