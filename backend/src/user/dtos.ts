import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

// Colunas retornáveis do DB em responses
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
  @Transform(({ value }: { value: string[] }) => {
    value.filter((item: string) => SELECTABLE_USER_COLUMNS.includes(item));
  })
  select?: string[];
}

export class GetUserByIdParamDto {
  @Type(() => Number)
  @IsInt({ message: 'ID deve ser numérico' })
  @Min(0, { message: 'ID deve ser positivo' })
  id!: number;
}

export class GetUserByIdSelectDto {
  @IsOptional()
  @Type(() => Array)
  @IsArray({ message: 'Select deve ser uma lista' })
  select?: string[];
}

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser um texto' })
  @MinLength(6, { message: 'Nome deve ter no mínimo 6 caracteres' })
  name!: string;
}
