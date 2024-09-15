import { addUser } from '@repository/users';
import { BadRequestError } from '@utils/error';
import { Handler } from 'sn-types-backend';
import { User } from 'types/user';

// Example - handler for nested route.

export const signup: Handler<User> = async (req, res) => {
    const { username, password, email } = req.body;

    const result = await addUser({ username, password, email });

    if (!result.status) {
        throw new BadRequestError(result.message);
    }

    return res.status(result.statusCode).send(result.payload);
};
