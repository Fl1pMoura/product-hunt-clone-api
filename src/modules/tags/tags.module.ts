import { Module } from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { TagsController } from './tags.controller';
import { validateTagsService } from './services/validate-tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, validateTagsService],
})
export class TagsModule {}
