import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @IsPublic()
  @ApiOperation({ summary: 'Criar uma nova empresa' })
  @ApiResponse({ status: 201, description: 'Empresa criada com sucesso.' })
  @ApiResponse({ status: 409, description: 'CNPJ já cadastrado.' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  @IsPublic()
  @ApiOperation({ summary: 'Listar todas as empresas' })
  @ApiResponse({ status: 200, description: 'Lista de empresas retornada com sucesso.' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @IsPublic()
  @ApiOperation({ summary: 'Buscar uma empresa pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  @ApiResponse({ status: 200, description: 'Empresa encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @IsPublic()
  @ApiOperation({ summary: 'Atualizar uma empresa' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  @ApiResponse({ status: 200, description: 'Empresa atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada.' })
  @ApiResponse({ status: 409, description: 'CNPJ já cadastrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @IsPublic()
  @ApiOperation({ summary: 'Remover uma empresa' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  @ApiResponse({ status: 200, description: 'Empresa removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.remove(id);
  }
}