import { ErrorRequestHandler } from 'express';
import { CustomAPIError } from 'helpers/error';
import { StatusCodes } from 'http-status-codes';

export const errorHandlerMiddleware: ErrorRequestHandler = (
    err,
    _,
    res,
    next
) => {
    let message = 'Something went wrong, please try again';
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    if (err instanceof CustomAPIError) {
        message = err.message;
        statusCode = err.statusCode;
    }

    res.status(statusCode).json({ message });
    next();
};
