import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { validateProductsService } from './services/validate-products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, validateProductsService],
})
export class ProductsModule {}
