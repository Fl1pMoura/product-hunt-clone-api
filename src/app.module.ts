import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [ProductsModule, ProductsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
