import { Module } from '@nestjs/common';
import { UpvotesService } from './services/upvotes.service';
import { UpvotesController } from './upvotes.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { validateUpvotesService } from './services/validate-upvote.service';
import { validateProductsService } from '../products/services/validate-products.service';

@Module({
  controllers: [UpvotesController],
  providers: [
    UpvotesService,
    PrismaService,
    validateUpvotesService,
    validateProductsService,
  ],
})
export class UpvotesModule {}
