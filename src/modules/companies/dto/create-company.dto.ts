import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Nome da empresa' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'CNPJ da empresa (14 dígitos)' })
  @IsNotEmpty()
  @IsString()
  @Length(14, 14, { message: 'CNPJ deve ter 14 caracteres' })
  cnpj: string;

  @ApiProperty({ description: 'Endereço da empresa', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Telefone da empresa', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
