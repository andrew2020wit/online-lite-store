import * as bcrypt from 'bcrypt';

export async function getPassWordHash(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
