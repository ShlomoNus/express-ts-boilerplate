import { sign, verify } from 'jsonwebtoken';
import { CONFIG } from 'src/config';

const secret = CONFIG.Secret || 'secret';

export function generateJwt(params: Record<string, unknown>) {
    return sign(params, secret, { expiresIn: '1d' });
}

export function verifyJwt(token: string) {
    return verify(token, secret);
}
