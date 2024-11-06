import { Module } from '@nestjs/common';
import { UpvotesService } from './services/upvotes.service';
import { UpvotesController } from './upvotes.controller';

@Module({
  controllers: [UpvotesController],
  providers: [UpvotesService],
})
export class UpvotesModule {}
