import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './repositories/products';
import { UpvotesRepository } from './repositories/upvotes';

@Global()
@Module({
  providers: [PrismaService, ProductsRepository, UpvotesRepository],
  exports: [ProductsRepository, UpvotesRepository],
})
export class DatabaseModule {}
