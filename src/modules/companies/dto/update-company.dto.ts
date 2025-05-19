import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}

// Cria a classe UpdateCompanyDto, estendendo de PartialType(CreateCompanyDto), o que significa:

// Todos os campos de CreateCompanyDto são copiados, mas agora são opcionais (?).

// Isso é útil para operações de atualização (PATCH), onde você pode enviar apenas parte dos dados.

