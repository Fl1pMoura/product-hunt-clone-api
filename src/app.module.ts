import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './shared/database/database.module';
import { UpvotesModule } from './modules/upvotes/upvotes.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  imports: [
    ProductsModule,
    ProductsModule,
    DatabaseModule,
    UpvotesModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
