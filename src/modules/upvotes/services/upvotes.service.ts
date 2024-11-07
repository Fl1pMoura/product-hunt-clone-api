import { Injectable } from '@nestjs/common';
import { CreateUpvoteDto } from '../dto/create-upvote.dto';
import { UpvotesRepository } from 'src/shared/database/repositories/upvotes';
import { ProductsRepository } from 'src/shared/database/repositories/products';
import { PrismaService } from 'src/shared/database/prisma.service';
import { validateUpvotesService } from './validate-upvote.service';
import { validateProductsService } from 'src/modules/products/services/validate-products.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpvotesService {
  constructor(
    private readonly UpvotesRepo: UpvotesRepository,
    private readonly ProductsRepo: ProductsRepository,
    private readonly prisma: PrismaService,
    private readonly validateUpvotes: validateUpvotesService,
    private readonly validateProducts: validateProductsService
  ) {}
  findAll() {
    return this.UpvotesRepo.findAll({ include: { product: false } });
  }

  async findAllByProductId(productId: string) {
    await this.validateProducts.validateNotFound(productId);
    return this.UpvotesRepo.findAll({
      where: { productId },
      include: { product: false },
    });
  }

  async findOne(upvoteId: string) {
    await this.validateUpvotes.validateNotFound(upvoteId);
    const product = await this.UpvotesRepo.findUnique({
      where: { id: upvoteId },
    });

    return product;
  }

  async create(createUpvoteDto: CreateUpvoteDto) {
    const { userId, productId } = createUpvoteDto;
    await this.validateProducts.validateNotFound(productId);

    const existingUpvote = await this.UpvotesRepo.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existingUpvote) {
      // Se já existe um upvote, removemos o upvote do produto e das tags
      await this.prisma.$transaction([
        this.UpvotesRepo.delete({ where: { id: existingUpvote.id } }),
        this.ProductsRepo.update({
          where: { id: productId },
          data: { upvoteCount: { decrement: 1 } },
        }),
        // Atualizando as tags relacionadas ao produto
        this.updateTagUpvotes(productId, -1),
      ]);
      return { message: 'Upvote removed' };
    } else {
      // Se não existe upvote, criamos o novo upvote
      const newUpvote = await this.prisma.$transaction([
        this.UpvotesRepo.create({
          data: {
            userId,
            productId,
            createdAt: new Date().toISOString(),
          },
        }),
        this.ProductsRepo.update({
          where: { id: productId },
          data: { upvoteCount: { increment: 1 } },
        }),
        // Atualizando as tags relacionadas ao produto
        this.updateTagUpvotes(productId, 1),
      ]);
      return newUpvote[0];
    }
  }

  // Função para atualizar a contagem de upvotes das tags associadas ao produto
  private async updateTagUpvotes(productId: string, increment: number) {
    const product = (await this.ProductsRepo.findUnique({
      where: { id: productId },
      include: { tags: true },
    })) as Prisma.ProductGetPayload<{ include: { tags: true } }>; // Tipando explicitamente

    if (!product) {
      throw new Error(`Produto com ID ${productId} não encontrado.`);
    }

    const updateTagPromises = product.tags.map((tag) =>
      this.prisma.tags.update({
        where: { id: tag.id },
        data: { upvoteCount: { increment } },
      })
    );

    return await Promise.all(updateTagPromises);
  }

  // async update(upvoteId: string, updateUpvoteDto: UpdateUpvoteDto) {
  //   await this.validateUpvotes.validateNotFound(upvoteId);
  //   const { createdAt, productId, userId } = updateUpvoteDto;
  //   const upvote = await this.UpvotesRepo.findUnique({
  //     where: { id: upvoteId },
  //   });
  //   if (!upvote) {
  //     throw new NotFoundException('Upvote not found');
  //   }
  //   return this.UpvotesRepo.update({
  //     where: { id: upvoteId },
  //     data: { createdAt, productId, userId },
  //   });
  // }

  // async remove(upvoteId: string) {
  //   await this.validateUpvotes.validateNotFound(upvoteId);
  //   const upvote = await this.UpvotesRepo.findUnique({
  //     where: { id: upvoteId },
  //   });
  //   if (!upvote) {
  //     throw new NotFoundException('Upvote not found');
  //   }
  //   await this.UpvotesRepo.delete({
  //     where: { id: upvoteId },
  //   });
  //   return { message: 'Upvote removed' };
  // }
}
