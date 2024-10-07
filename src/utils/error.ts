import { StatusCodes } from 'http-status-codes';

type DefaultErrorConstractorInputObject = {
    message: string;
    statusCode: number;
};

export class CustomAPIError extends Error {
    statusCode: number;

    constructor({ message, statusCode }: DefaultErrorConstractorInputObject) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends CustomAPIError {
    constructor(message: string) {
        super({ message, statusCode: StatusCodes.BAD_REQUEST });
    }
}

export class ConflictError extends CustomAPIError {
    constructor(message: string) {
        super({ message, statusCode: StatusCodes.CONFLICT });
    }
}

export class NotFoundError extends CustomAPIError {
    constructor(message: string) {
        super({ message, statusCode: StatusCodes.NOT_FOUND });
    }
}

export class UnauthenticatedError extends CustomAPIError {
    constructor(message: string) {
        super({ message, statusCode: StatusCodes.UNAUTHORIZED });
    }
}

export class UnauthorizedError extends CustomAPIError {
    constructor(message: string) {
        super({ message, statusCode: StatusCodes.FORBIDDEN });
    }
}

export const errorsObject = {
    BadRequestError,
    ConflictError,
    NotFoundError,
    UnauthenticatedError,
    UnauthorizedError,
};

type ErrorsNames = keyof typeof errorsObject;

export function getErrorByName(errorsName: ErrorsNames, message: string) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const SelectedClass = errorsObject[errorsName];

    return new SelectedClass(message);
}
