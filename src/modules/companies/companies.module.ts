import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from '@database/PrismaService';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService],
})
export class CompaniesModule {}