import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @IsPublic()
  findAll() {
    return this.productsService.findMany();
  }

  @Get(':productId')
  @IsPublic()
  findOne(@Param('productId') productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':productId')
  @UseGuards(AuthGuard)
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  @UseGuards(AuthGuard)
  remove(@Param('productId') productId: string) {
    return this.productsService.remove(productId);
  }
}
