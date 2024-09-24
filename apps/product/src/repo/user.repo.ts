import { KyselyService } from '@lib/database';
import { Injectable } from '@nestjs/common';
import { DB } from '../types/database';
import { UserCreatedData } from '@lib/types';

@Injectable()
export class UserRepo {
  constructor(private readonly client: KyselyService<DB>) { }
  async saveUser(payload: UserCreatedData) {
    return this.client
      .insertInto('User')
      .values(payload)
      .execute()
  }

}
