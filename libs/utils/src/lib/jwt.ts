import * as jwt from 'jsonwebtoken';

export async function sign  (userData: {id: string, email: string}): Promise<string> {
  return jwt.sign(userData, process.env['JWT_SECRET'] as string, {expiresIn: '1h'});
}

