import { Response } from 'express'
import { Body, Controller, Get, Post, Res, UsePipes } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ZodValidationPipe } from '@lib/utils';
import { CreateUserDto, createUserSchema, LoginDto, loginSchema } from '@lib/schema';
import { convertResponse } from '@lib/helper';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const data =  await this.authService.signup(createUserDto)
    return convertResponse(res, data)
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const data = await this.authService.login(loginDto)
    return convertResponse(res, data)
  }

  @Get('health')
  async health( @Res() res: Response) {
    return convertResponse(res, { data: {}, message: 'working', status: 'successful' })
  }
}
