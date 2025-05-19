import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@database/PrismaService';
import generateCode from '@utils/generateCode';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  productCode = generateCode();
  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data: {
          ...createProductDto,
          code: this.productCode
        },
        include: { company: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundException(
            `Empresa com ID ${createProductDto.companyId} não encontrada`,
          );
        }
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { company: true },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { company: true },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
        include: { company: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Produto com ID ${id} não encontrado`);
        }
        if (error.code === 'P2003') {
          throw new NotFoundException(
            `Empresa com ID ${updateProductDto.companyId} não encontrada`,
          );
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Produto com ID ${id} não encontrado`);
        }
      }
      throw error;
    }
  }
}
