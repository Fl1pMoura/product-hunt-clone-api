import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpvoteDto } from '../dto/create-upvote.dto';
import { UpdateUpvoteDto } from '../dto/update-upvote.dto';
import { UpvotesRepository } from 'src/shared/database/repositories/upvotes';

@Injectable()
export class UpvotesService {
  constructor(private readonly UpvotesRepo: UpvotesRepository) {}
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
      await this.UpvotesRepo.delete({ where: { id: existingUpvote.id } });
      return { message: 'Upvote removed' };
    } else {
      const newUpvote = await this.UpvotesRepo.create({
        data: {
          userId,
          productId,
          createdAt: new Date().toISOString(),
        },
      });

      return newUpvote;
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
