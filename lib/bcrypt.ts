import bcrypt from 'bcryptjs';
import envConfig from '../config/envConfig';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, envConfig.salt_rounds);
};
