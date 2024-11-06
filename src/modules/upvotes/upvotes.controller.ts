import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UpvotesService } from './services/upvotes.service';
import { CreateUpvoteDto } from './dto/create-upvote.dto';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { AuthGuard } from '../auth/auth.guard';

@Controller('upvotes')
export class UpvotesController {
  constructor(private readonly upvotesService: UpvotesService) {}

  @Get()
  @IsPublic()
  findAll() {
    return this.upvotesService.findAll();
  }
  @Get('product/:productId')
  @IsPublic()
  findAllByProductId(@Param('productId') productId: string) {
    return this.upvotesService.findAllByProductId(productId);
  }

  @Get(':upvoteId')
  @IsPublic()
  findOne(@Param('upvoteId') upvoteId: string) {
    return this.upvotesService.findOne(upvoteId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createUpvoteDto: CreateUpvoteDto) {
    return this.upvotesService.create(createUpvoteDto);
  }

  // @Put(':upvoteId')
  // @UseGuards(AuthGuard)
  // update(
  //   @Param('upvoteId') upvoteId: string,
  //   @Body() updateUpvoteDto: UpdateUpvoteDto
  // ) {
  //   return this.upvotesService.update(upvoteId, updateUpvoteDto);
  // }

  // @Delete(':upvoteId')
  // @UseGuards(AuthGuard)
  // remove(@Param('upvoteId') upvoteId: string) {
  //   return this.upvotesService.remove(upvoteId);
  // }
}
