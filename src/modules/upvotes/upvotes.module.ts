import { Module } from '@nestjs/common';
import { UpvotesService } from './services/upvotes.service';
import { UpvotesController } from './upvotes.controller';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [UpvotesController],
  providers: [UpvotesService, PrismaService],
})
export class UpvotesModule {}
