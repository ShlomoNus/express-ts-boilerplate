import { addUser, getUser } from '@repository/users';
import { BadRequestError } from '@utils/error';
import { Handler } from 'sn-types-backend';
import { User } from 'types/user';

// Change logic as you wish.
export const login: Handler<User> = (req, res) => {
    const { username, password, email } = req.body;
    const found = getUser({ username, password, email });

    if (!found) {
        return res.status(401).send('Login failed');
    }

    return res.status(200).send('Success');
};

export const signup: Handler<User> = async (req, res) => {
    const { username, password, email } = req.body;

    const result = await addUser({ username, password, email });

    if (!result.status) {
        throw new BadRequestError(result.message);
    }

    return res.status(result.statusCode).send(result.payload);
};
