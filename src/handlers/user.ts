import { Handler } from 'sn-types-backend';
import { addUser } from 'repository';
import { User } from 'types';
import { BadRequestError } from 'helpers/error';

// Example - handler for nested route.

export const signup: Handler<User> = async (req, res) => {
    const { username, password, email } = req.body;

    const result = await addUser({ username, password, email });

    if (!result.status) {
        throw new BadRequestError(result.message);
    }

    return res.status(result.statusCode).send(result.payload);
};
