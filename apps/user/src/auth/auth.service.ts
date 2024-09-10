import { Injectable } from "@nestjs/common";
import { IServiceHelper } from '@lib/types'
import { CreateUserDto, LoginDto } from '@lib/schema';
import {UserRepo} from '../repo/user.repo'
import { hash, match } from '@lib/helper';
import { sign } from '@lib/utils';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepo) { }

  async signup(createUserDto: CreateUserDto): Promise<IServiceHelper> {

    const userExist = await this.userRepo.getUserByEmail(createUserDto.email);
    if (userExist) return {
      status: 'conflict',
      message: 'You already have an account with us, please consider login in'
    }
    const hashedPassword =await hash(createUserDto.password);
    const user = await this.userRepo.createUser({
      ...createUserDto,
      password: hashedPassword
    })
    const token = await sign({id: user.id, email:user.email})
    return {
      status: 'successful',
      message: 'User signup successful',
      data: {...user, token}
    }
  }
  async login(loginDto: LoginDto): Promise<IServiceHelper> {

    const user = await this.userRepo.getUserByEmail(loginDto.email);
    if (!user) return {
      status: 'not-found',
      message: 'Incorrect email or password'
    }

    const passwordMatch =await match(loginDto.password, user.password);
    if (!passwordMatch) return {
      status: 'forbidden',
      message: 'Incorrect email or password'
    }
    const token = await sign({id: user.id, email:user.email})
    return {
      status: 'successful',
      message: 'login successful',
      data: {...user, password: undefined, token}
    }
  }
}
