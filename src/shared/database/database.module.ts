import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './repositories/products';

@Global()
@Module({
  providers: [PrismaService, ProductsRepository],
  exports: [ProductsRepository],
})
export class DatabaseModule {}
