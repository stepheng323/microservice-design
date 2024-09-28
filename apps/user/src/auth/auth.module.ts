import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PublisherUserCreated } from '../event/publisher/userCreatedPublisher';

@Module({
  controllers: [AuthController],
  exports: [],
  providers: [AuthService, PublisherUserCreated]
})


export class AuthModule { }
