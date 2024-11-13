import { addUser, validateUser } from '@repository/users';
import { BadRequestError } from '@utils/error';
import { Handler } from 'sn-types-backend';
import { SelectUser } from 'src/db/schema';

// Change logic as you wish.
export const login: Handler<SelectUser> = async (req, res) => {
    const { username, password, email } = req.body;
    const found = await validateUser({ username, password, email });

    if (!found) {
        return res.status(401).send('Login failed');
    }

    return res.status(200).send('Success');
};

export const signup: Handler<SelectUser> = async (req, res) => {
    const { username, password, email } = req.body;

    const result = await addUser({ username, password, email });

    if (!result.status) {
        throw new BadRequestError(result.message);
    }

    return res.status(result.statusCode).send(result.payload);
};
