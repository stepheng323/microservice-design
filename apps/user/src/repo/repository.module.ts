import { Global, Module } from '@nestjs/common';
import { UserRepo } from './user.repo';


@Global()
@Module({
  providers: [
    UserRepo,
  ],
  exports: [
    UserRepo,
  ],
})
export class RepositoryModule {}
