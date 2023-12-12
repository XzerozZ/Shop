import bcrypt from 'bcryptjs';
const saltRounds = 10;
export const matchPassword = async (password: string, hash: string) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
};
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(saltRounds); 
    const hash = await bcrypt.hash(password, salt);
    return hash;
};