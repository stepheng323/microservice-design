import { KyselyService } from "@lib/database";
import { Injectable } from "@nestjs/common";
import { DB } from "../types/database";
import { CreateUserDto } from '@lib/schema';


@Injectable()
export class UserRepo {
  constructor(private readonly client: KyselyService<DB>) { }

  async getUserByEmail(email: string) {
    return this.client
      .selectFrom('User').select(['id', 'email', 'firstname', 'lastname', 'password'])
      .where('email', '=', email)
      .executeTakeFirst()
  }

  async createUser(userDetails: CreateUserDto) {
    return this.client
      .insertInto('User')
      .values(userDetails)
      .returning([
        'id',
        'lastname',
        'email',
        'firstname',
        'profileImage',
        'phoneNumber'
      ]).executeTakeFirst()
  }

}
