import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from 'src/shared/database/repositories/products';
import { validateProductsService } from './validate-products.service';
import { validateTagsService } from 'src/modules/tags/services/validate-tags.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly ProductsRepo: ProductsRepository,
    private readonly ValidateProduct: validateProductsService,
    private readonly ValidateTags: validateTagsService
  ) {}

  async findMany() {
    const products = await this.ProductsRepo.findMany({
      include: { upVotes: false, tags: true },
      orderBy: { upvoteCount: 'desc' },
    });

    return products;
  }

  async findOne(productId: string) {
    await this.ValidateProduct.validateNotFound(productId);
    const product = await this.ProductsRepo.findUnique({
      where: { id: productId },
      include: { tags: true },
    });

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const { createdAt, creator, creatorId, description, name, url, tags } =
      createProductDto;
    await this.ValidateProduct.validateDuplicated(name, url);
    await this.ValidateTags.validateNotFound(tags.map((tagId) => tagId));
    await this.ProductsRepo.create({
      data: {
        creator,
        creatorId,
        description,
        name,
        url,
        createdAt,
        tags: {
          connect: Array.isArray(tags)
            ? tags.map((tagId) => ({ id: tagId }))
            : [{ id: tags }],
        },
      },
    });
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const { createdAt, creator, creatorId, description, name, url, tags } =
      updateProductDto;
    await this.ValidateProduct.validateNotFound(productId);
    await this.ValidateProduct.validateDuplicated(name, url, productId);
    await this.ValidateTags.validateNotFound(tags.map((tagId) => tagId));
    return this.ProductsRepo.update({
      where: { id: productId },
      data: {
        createdAt,
        creator,
        creatorId,
        description,
        name,
        url,
        tags: {
          connect: Array.isArray(tags)
            ? tags.map((tagId) => ({ id: tagId }))
            : [{ id: tags }],
        },
      },
    });
  }

  async remove(productId: string) {
    await this.ValidateProduct.validateNotFound(productId);
    await this.ProductsRepo.delete({ where: { id: productId } });

    return null;
  }
}
