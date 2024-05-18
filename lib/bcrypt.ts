import bcrypt from 'bcryptjs';
import envConfig from '../config/envConfig';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, envConfig.salt_rounds);
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};
