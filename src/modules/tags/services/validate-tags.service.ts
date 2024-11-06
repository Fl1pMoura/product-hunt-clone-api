import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { TagsRepository } from 'src/shared/database/repositories/tags';

@Injectable()
export class validateTagsService {
  constructor(private readonly TagsRepo: TagsRepository) {}
  async validateNotFound(tagIds: string | string[]) {
    // Verifica se tagIds é uma string, e transforma em um array
    const ids = Array.isArray(tagIds) ? tagIds : [tagIds];

    // Verifica se todos os IDs são UUID válidos
    for (const tagId of ids) {
      if (!isUUID(tagId)) {
        throw new BadRequestException(`ID da tag inválido`);
      }
    }

    // Verifica se todas as tags existem
    const tags = await this.TagsRepo.findAll({
      where: { id: { in: ids } },
    });

    if (tags.length !== ids.length) {
      throw new NotFoundException(
        'Uma ou mais tags não foram encontradas ou estão repetidas.'
      );
    }
  }

  async validateDuplicated(name: string, tagId?: string) {
    if (tagId) {
      await this.validateNotFound(tagId);
    }
    // Verifica se a tag com o nome já existe, mas ignora a tag que está sendo atualizada
    const existingTag = await this.TagsRepo.findFirst({
      where: {
        name,
        NOT: { id: tagId }, // Ignora a tag com o id que está sendo atualizada
      },
    });

    if (existingTag) {
      throw new ConflictException('A tag com esse nome já existe.');
    }
  }
}
