import { Global, Module } from '@nestjs/common';
import { ProductRepo } from './product';
import { UserRepo } from './user.repo';


@Global()
@Module({
  providers: [
    ProductRepo,
    UserRepo
  ],
  exports: [
    ProductRepo,
    UserRepo
  ],
})
export class RepositoryModule {}
