import { User } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

// Todas as colunas do Usuário
const USER_COLUMNS = ['id', 'name', 'photo', 'cpf', 'phone', 'createdAt'];

// Colunas retornáveis não-sensíveis do DB em responses
const SELECTABLE_USER_COLUMNS = ['id', 'name', 'photo', 'createdAt'];

export class GetAllUsersDto {
  @Type(() => Number)
  @IsInt({ message: 'Take deve ser inteiro' })
  @Min(1, { message: 'Take deve ser maior que zero' })
  take!: number;

  @Type(() => Number)
  @IsInt({ message: 'Skip deve ser inteiro' })
  @Min(0, { message: 'Skip não pode ser negativo' })
  skip!: number;

  @IsOptional()
  @Type(() => Array)
  @IsArray({ message: 'Select deve ser uma lista' })
  // Deixar apenas os items retornáveis
  @Transform(({ value }: { value: string[] | any[] }) => {
    value.filter((item: string) => SELECTABLE_USER_COLUMNS.includes(item));
  })
  select?: string[];
}

export class IdParamDto {
  @Type(() => Number)
  @IsInt({ message: 'ID deve ser numérico' })
  @Min(0, { message: 'ID deve ser positivo' })
  id!: number;
}

export class GetUserByIdSelectDto {
  @IsOptional()
  @Type(() => Array)
  @IsArray({ message: 'Select deve ser uma lista' })
  @Transform(({ value }: { value: string[] | any[] }) => {
    value.filter((item) => USER_COLUMNS.includes(item));
  })
  select?: string[];
}

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser um texto' })
  @MinLength(6, { message: 'Nome deve ter no mínimo 6 caracteres' })
  name!: string;
}

export class PatchUserDto {
  @IsOptional()
  @IsString({ message: 'Nome deve ser um texto' })
  name?: string;

  @IsOptional()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF deve estar no formato 000.000.000-00',
  })
  cpf?: string;

  @IsOptional()
  @Matches(/^\(\d{2}\)\s\d{5}-\d{4}$/, {
    message: 'Telefone deve estar no formato (99) 99999-9999',
  })
  phone?: string;
}
