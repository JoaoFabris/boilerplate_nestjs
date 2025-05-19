import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @IsPublic()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @IsPublic()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso.' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @IsPublic()
  @ApiOperation({ summary: 'Buscar um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @IsPublic()
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto ou empresa não encontrados.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @IsPublic()
  @ApiOperation({ summary: 'Remover um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}