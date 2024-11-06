import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { TagsRepository } from 'src/shared/database/repositories/tags';
import { validateTagsService } from './validate-tags.service';

@Injectable()
export class TagsService {
  constructor(
    private readonly TagsRepo: TagsRepository,
    private readonly ValidateTags: validateTagsService
  ) {}
  async findAll() {
    const tags = await this.TagsRepo.findAll({ include: { products: false } });
    return tags;
  }

  async findOne(tagId: string) {
    await this.ValidateTags.validateNotFound(tagId);
    return await this.TagsRepo.findUnique({ where: { id: tagId } });
  }

  async create(createTagDto: CreateTagDto) {
    const { name } = createTagDto;
    await this.ValidateTags.validateDuplicated(name);
    const tag = await this.TagsRepo.create({ data: { name } });

    return tag;
  }

  async update(tagId: string, updateTagDto: UpdateTagDto) {
    const { name } = updateTagDto;
    await this.ValidateTags.validateDuplicated(name, tagId);
    const tag = await this.TagsRepo.update({
      where: { id: tagId },
      data: { name },
    });

    return tag;
  }

  async remove(tagId: string) {
    await this.ValidateTags.validateNotFound(tagId);
    await this.TagsRepo.delete({ where: { id: tagId } });

    return null;
  }
}
