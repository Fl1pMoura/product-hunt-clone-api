import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './repositories/products';
import { UpvotesRepository } from './repositories/upvotes';
import { TagsRepository } from './repositories/tags';

@Global()
@Module({
  providers: [
    PrismaService,
    ProductsRepository,
    UpvotesRepository,
    TagsRepository,
  ],
  exports: [ProductsRepository, UpvotesRepository, TagsRepository],
})
export class DatabaseModule {}
