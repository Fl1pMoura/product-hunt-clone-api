import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from 'src/shared/database/repositories/products';
import { validateProductsService } from './validate-products.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly ProductsRepo: ProductsRepository,
    private readonly ValidateProduct: validateProductsService
  ) {}

  async findMany() {
    const products = await this.ProductsRepo.findMany({
      include: { upVotes: true },
    });

    return products;
  }

  async findOne(productId: string) {
    const product = await this.ProductsRepo.findUnique({
      where: { id: productId },
    });

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const { createdAt, creator, creatorId, description, name, url } =
      createProductDto;
    await this.ValidateProduct.validateDuplicated(url, name);
    await this.ProductsRepo.create({
      data: { creator, creatorId, description, name, url, createdAt },
    });
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const { createdAt, creator, creatorId, description, name, url } =
      updateProductDto;
    await this.ValidateProduct.validateNotFound(productId);
    await this.ValidateProduct.validateDuplicated(name, url, productId);
    return this.ProductsRepo.update({
      where: { id: productId },
      data: {
        createdAt,
        creator,
        creatorId,
        description,
        name,
        url,
      },
    });
  }

  async remove(productId: string) {
    await this.ValidateProduct.validateNotFound(productId);
    await this.ProductsRepo.delete({ where: { id: productId } });

    return null;
  }
}
