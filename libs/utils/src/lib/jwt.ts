import * as jwt from 'jsonwebtoken';
import * as process from 'node:process';

export async function sign  (userData: {id: string, email: string}): Promise<string> {
  return jwt.sign(userData, process.env['JWT_SECRET'] as string, {expiresIn: '1h'});
}


export async function verify  (token: string){
  return jwt.verify(token, process.env['JWT_SECRET'] as string);
}

