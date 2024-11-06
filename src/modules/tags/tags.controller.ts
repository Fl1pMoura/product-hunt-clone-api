import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  @IsPublic()
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':tagId')
  @IsPublic()
  findOne(@Param('tagId') tagId: string) {
    return this.tagsService.findOne(tagId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Put(':tagId')
  @UseGuards(AuthGuard)
  update(@Param('tagId') tagId: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(tagId, updateTagDto);
  }

  @Delete(':tagId')
  @UseGuards(AuthGuard)
  remove(@Param('tagId') tagId: string) {
    return this.tagsService.remove(tagId);
  }
}
