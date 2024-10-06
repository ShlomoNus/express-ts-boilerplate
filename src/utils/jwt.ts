import { sign, verify } from 'jsonwebtoken';
import { CONFIG } from 'src/config';

const secret = CONFIG.Secret || 'secret';

export function generateJwt(id: string) {
    return sign({ id }, secret, { expiresIn: '30d' });
}

export function verifyJwt(token: string) {
    return verify(token, secret);
}
