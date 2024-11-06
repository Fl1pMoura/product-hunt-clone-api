import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class TagsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll<T extends Prisma.TagsFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.TagsFindManyArgs>
  ) {
    return this.prismaService.tags.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.TagsFindFirstArgs) {
    return this.prismaService.tags.findFirst(findFirstDto);
  }

  findUnique(findUniqueDto: Prisma.TagsFindUniqueArgs) {
    return this.prismaService.tags.findUnique(findUniqueDto);
  }

  create(createDto: Prisma.TagsCreateArgs) {
    return this.prismaService.tags.create(createDto);
  }

  update(updateDto: Prisma.TagsUpdateArgs) {
    return this.prismaService.tags.update(updateDto);
  }

  delete(deleteDto: Prisma.TagsDeleteArgs) {
    return this.prismaService.tags.delete(deleteDto);
  }
}
