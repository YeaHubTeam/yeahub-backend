import { randomBytes } from 'crypto';
import { hash } from 'argon2';
import { HASHING_CONFIG } from '@/common/constants';

export const hashPassword = async (passwordString: string) => {
  const salt = randomBytes(16);
  return hash(passwordString, { ...HASHING_CONFIG, salt });
};
