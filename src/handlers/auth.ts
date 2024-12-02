import { addUser, validateUser } from '@repository/users';
import { BadRequestError, NotFoundError } from '@utils/error';
import { convertToError } from '@utils/types';
import { HttpStatusCode } from 'axios';
import { Handler } from 'shen-types';
import { SelectUser } from 'src/db/schema';

type LoginUser = Omit<SelectUser, 'id'>;

export const login: Handler<LoginUser> = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const found = await validateUser({ username, password, email });

        if (!found) {
            return res.status(401).json({ message: '' });
        }

        return res.status(HttpStatusCode.Ok).send('Success');
    } catch (error) {
        const typedError = convertToError(error);

        const notFoundError = new NotFoundError(typedError.message);

        return res.json({ ...notFoundError });
    }
};

export const resetPassword: Handler<{ email: string }> = async (req, res) => {
    const { email } = req.body;

    return res.status(HttpStatusCode.Ok).send(email);
};

export const signup: Handler<LoginUser> = async (req, res) => {
    const { username, password, email } = req.body;

    const result = await addUser({ username, password, email });

    if (!result.status) {
        throw new BadRequestError(result.message);
    }

    return res.status(result.statusCode).send(result.payload);
};

export const getUser: Handler<LoginUser> = async (req, res) => {
    const { username, password, email } = req.body;

    const result = await addUser({ username, password, email });

    if (!result.status) {
        throw new BadRequestError(result.message);
    }

    return res.status(result.statusCode).send(result.payload);
};
