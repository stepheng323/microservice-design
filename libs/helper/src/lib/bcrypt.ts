import * as bcrypt from 'bcrypt'

export const match = (plainPassword: string, hashedPassword: string) =>  {
  return bcrypt.compare(plainPassword, hashedPassword);
}


export const hash = (password: string) => {
  return bcrypt.hash(password, 12);
}
