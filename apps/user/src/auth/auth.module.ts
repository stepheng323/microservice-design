import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
// import { MessageService } from "../event/rabbitMQ.service";
import { RabbitMQService } from "@nestjs-scaffold/events";

@Module({
  controllers: [AuthController],
  exports: [],
  providers: [AuthService, RabbitMQService]
})


export class AuthModule { }
