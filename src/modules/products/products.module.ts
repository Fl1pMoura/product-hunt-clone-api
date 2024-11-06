import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { validateProductsService } from './services/validate-products.service';
import { validateTagsService } from '../tags/services/validate-tags.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, validateProductsService, validateTagsService],
})
export class ProductsModule {}
