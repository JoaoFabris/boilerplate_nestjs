// src/modules/products/dto/create-product.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Código do produto (gerado automaticamente se não fornecido)',
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'Descrição do produto', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Preço do produto' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'Quantidade em estoque', required: false, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiProperty({ description: 'ID da empresa à qual o produto pertence' })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}
