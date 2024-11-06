import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { ProductsRepository } from 'src/shared/database/repositories/products';

@Injectable()
export class validateProductsService {
  constructor(private readonly ProductRepo: ProductsRepository) {}
  async validateNotFound(productId: string) {
    // Verifica se o productId é um UUID válido
    if (!isUUID(productId)) {
      throw new BadRequestException('ID de produto inválido.');
    }

    const product = await this.ProductRepo.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }
  }

  async validateDuplicated(name: string, url: string, productId?: string) {
    if (productId) {
      await this.validateNotFound(productId);
    }
    // Verifica se o produto com o nome já existe, mas ignora o produto que está sendo atualizada
    const existingProduct = await this.ProductRepo.findFirst({
      where: {
        OR: [{ name }, { url }],
        NOT: { id: productId }, // Ignora o produto com o id que está sendo atualizado
      },
    });

    if (existingProduct) {
      throw new ConflictException('O produto com esse nome ou url já existe.');
    }
  }
}
