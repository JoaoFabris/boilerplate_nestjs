import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@database/PrismaService';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({
        data: createCompanyDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('CNPJ já cadastrado');
        }
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!company) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.prisma.company.update({
        where: { id },
        data: updateCompanyDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException('CNPJ já cadastrado');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.company.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Empresa com ID ${id} não encontrada`);
        }
      }
      throw error;
    }
  }
}
