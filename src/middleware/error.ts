import { ErrorRequestHandler } from 'express';
import { CustomAPIError } from 'helpers/error';
import { StatusCodes } from 'http-status-codes';

export const errorHandlerMiddleware: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    const customError = {
        msg: 'Something went wrong, please try again',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };

    if (err instanceof CustomAPIError) {
        customError.msg = err.message;
        customError.statusCode = err.statusCode;
    }

    res.status(customError.statusCode).json({ msg: customError.msg });
    next();
};
