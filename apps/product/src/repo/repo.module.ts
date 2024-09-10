import { Global, Module } from '@nestjs/common';
import { ProductRepo } from './product';


@Global()
@Module({
  providers: [
    ProductRepo,
  ],
  exports: [
    ProductRepo,
  ],
})
export class RepositoryModule {}
