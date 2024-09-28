import { Injectable } from '@nestjs/common';
import { KyselyService } from '@lib/database';
import { DB } from '../types/database';
import { UserCreatedData } from '@lib/types';

@Injectable()
export class UserRepo {
  constructor(private client: KyselyService<DB>) {}

  async saveUser(data: UserCreatedData) {
    return this.client.insertInto('User').values(data)
  }

}
