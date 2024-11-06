import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class UpvotesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll<T extends Prisma.UpvoteFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.UpvoteFindManyArgs>
  ) {
    return this.prismaService.upvote.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.UpvoteFindFirstArgs) {
    return this.prismaService.upvote.findFirst(findFirstDto);
  }

  findUnique(findUniqueDto: Prisma.UpvoteFindUniqueArgs) {
    return this.prismaService.upvote.findUnique(findUniqueDto);
  }

  create(createDto: Prisma.UpvoteCreateArgs) {
    return this.prismaService.upvote.create(createDto);
  }

  update(updateDto: Prisma.UpvoteUpdateArgs) {
    return this.prismaService.upvote.update(updateDto);
  }

  delete(deleteDto: Prisma.UpvoteDeleteArgs) {
    return this.prismaService.upvote.delete(deleteDto);
  }
}
