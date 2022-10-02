import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleReq {
  @IsNotEmpty({message: 'Это поле не может быть пустым'})
  @IsString({message: 'Допустим только строковый тип данных.'})
  name: string;
  @IsNotEmpty({message: 'Это поле не может быть пустым'})
  @IsString({message: 'Допустим только строковый тип данных.'})
  description: string;
}