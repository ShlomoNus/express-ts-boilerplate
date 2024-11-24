import { verifyJwt } from '@utils/jwt';
import { Middleware } from 'sn-types-backend';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const protect: Middleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = verifyJwt(token);

            console.info(decoded);

            next();
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.UNAUTHORIZED });
        }
    }

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: `${ReasonPhrases.UNAUTHORIZED}, no token`,
        });

        return;
    }
};
