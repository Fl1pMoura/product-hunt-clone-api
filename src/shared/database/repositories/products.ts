import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany<T extends Prisma.ProductFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.ProductFindManyArgs>
  ) {
    return this.prismaService.product.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.ProductFindFirstArgs) {
    return this.prismaService.product.findFirst(findFirstDto);
  }

  findUnique(findUniqueDto: Prisma.ProductFindUniqueArgs) {
    return this.prismaService.product.findUnique(findUniqueDto);
  }

  create(createDto: Prisma.ProductCreateArgs) {
    return this.prismaService.product.create(createDto);
  }

  update(updateDto: Prisma.ProductUpdateArgs) {
    return this.prismaService.product.update(updateDto);
  }

  delete(deleteDto: Prisma.ProductDeleteArgs) {
    return this.prismaService.product.delete(deleteDto);
  }
}
