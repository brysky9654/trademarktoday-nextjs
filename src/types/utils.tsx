import bcrypt from 'bcryptjs'
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
