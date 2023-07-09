import bcrypt from 'bcryptjs'
import crypto from 'crypto'
export const REDIRECT_URI = 'http://trademarktoday.com.au/api/google';
// export const REDIRECT_URI = 'http://localhost/api/google';
export const JWT_SIGN_KEY = 'de98hw9ew0hbmj6v8sd9w';
export const hash = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
export const validateEmail = (email: string) => {
  const pattern = /^[\w\.-]+@[\w\.-]+\.\w+$/;
  return pattern.test(email);
}
export const generateRandomKey = (length: number) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}