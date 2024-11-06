import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { UpvotesRepository } from 'src/shared/database/repositories/upvotes';

@Injectable()
export class validateUpvotesService {
  constructor(private readonly ProductRepo: UpvotesRepository) {}
  async validateNotFound(upvoteId: string) {
    // Verifica se o productId é um UUID válido
    if (!isUUID(upvoteId)) {
      throw new BadRequestException('ID de upvoteId inválido.');
    }

    const product = await this.ProductRepo.findUnique({
      where: { id: upvoteId },
    });

    if (!product) {
      throw new NotFoundException('Upvote não encontrado.');
    }
  }
}
