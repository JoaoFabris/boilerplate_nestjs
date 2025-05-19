import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IsPublic } from './modules/auth/decorators/is-public.decorator'; // Ajuste o caminho conforme necessário

@ApiTags('App')
@Controller()
export class AppController {
  @IsPublic() // Use o decorador @IsPublic() aqui
  @Get()
  @ApiOperation({ summary: 'Página inicial da API' })
  getHello() {
    return {
      message: 'API de Empresas e Produtos',
      version: '1.0.0',
      endpoints: {
        companies: '/v1/companies',
        products: '/v1/products',
        docs: '/docs'
      }
    };
  }
}