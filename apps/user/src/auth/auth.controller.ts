import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ZodValidationPipe } from '@lib/utils';
import { CreateUserDto, createUserSchema, LoginDto, loginSchema } from '@lib/schema';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }


  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}
