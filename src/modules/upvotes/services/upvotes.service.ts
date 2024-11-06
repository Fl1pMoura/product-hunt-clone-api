import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpvoteDto } from '../dto/create-upvote.dto';
import { UpdateUpvoteDto } from '../dto/update-upvote.dto';
import { UpvotesRepository } from 'src/shared/database/repositories/upvotes';
import { ProductsRepository } from 'src/shared/database/repositories/products';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class UpvotesService {
  constructor(
    private readonly UpvotesRepo: UpvotesRepository,
    private readonly ProductsRepo: ProductsRepository,
    private readonly prisma: PrismaService
  ) {}
  findAll() {
    return this.UpvotesRepo.findAll({ include: { product: true } });
  }

  async findOne(upvoteId: string) {
    const product = await this.UpvotesRepo.findUnique({
      where: { id: upvoteId },
    });

    return product;
  }

  async create(createUpvoteDto: CreateUpvoteDto) {
    const { userId, productId } = createUpvoteDto;

    const existingUpvote = await this.UpvotesRepo.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existingUpvote) {
      await this.prisma.$transaction([
        this.UpvotesRepo.delete({ where: { id: existingUpvote.id } }),
        this.ProductsRepo.update({
          where: { id: productId },
          data: { upvoteCount: { decrement: 1 } },
        }),
      ]);
      return { message: 'Upvote removed' };
    } else {
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
      ]);

      return newUpvote[0];
    }
  }

  async update(upvoteId: string, updateUpvoteDto: UpdateUpvoteDto) {
    const { createdAt, productId, userId } = updateUpvoteDto;
    const upvote = await this.UpvotesRepo.findUnique({
      where: { id: upvoteId },
    });
    if (!upvote) {
      throw new NotFoundException('Upvote not found');
    }
    return this.UpvotesRepo.update({
      where: { id: upvoteId },
      data: { createdAt, productId, userId },
    });
  }

  async remove(upvoteId: string) {
    const upvote = await this.UpvotesRepo.findUnique({
      where: { id: upvoteId },
    });
    if (!upvote) {
      throw new NotFoundException('Upvote not found');
    }
    await this.UpvotesRepo.delete({
      where: { id: upvoteId },
    });
    return { message: 'Upvote removed' };
  }
}
