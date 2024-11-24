import { findUser,addUser } from '@repository/users';
import { IUser } from '@src/types/user';
import { BadRequestError, NotFoundError } from '@utils/error';
import { convertToError } from '@utils/types';
import { HttpStatusCode } from 'axios';
import { Handler } from 'sn-types-backend';


export const login: Handler<IUser> = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const found = await findUser({ username, password, email });

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

export const signup: Handler<IUser> = async (req, res) => {
    const { username, password, email } = req.body;

    const result = await addUser({ username, password, email });

    if (!result.status) {
        throw new BadRequestError(result.message);
    }

    return res.status(result.statusCode).send(result.payload);
};

export const getUser: Handler<IUser> = async (req, res) => {
    const { username, password, email } = req.body;

    const result = await addUser({ username, password, email });

    if (!result.status) {
        throw new BadRequestError(result.message);
    }

    return res.status(result.statusCode).send(result.payload);
};
