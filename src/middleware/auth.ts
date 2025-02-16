import { verifyJwt } from '@utils/jwt';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Middleware } from 'sn-types-backend';

export const protect: Middleware = async (req, res, next) => {
    let message = `${ReasonPhrases.UNAUTHORIZED}, no token provided`;
    const token =
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
            ? req.headers.authorization.split(' ')[1]
            : req.cookies.token
              ? req.cookies.token
              : null;

    if (token) {
        try {
            verifyJwt(token);
            next();
        } catch {
            message = `${ReasonPhrases.UNAUTHORIZED}, invalid token`;
        }
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({ message });
};
