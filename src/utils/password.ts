import { compare, hash } from 'bcryptjs';

export async function hashPassword(password: string) {
    return await hash(password, 10);
}

export async function comparePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
}
