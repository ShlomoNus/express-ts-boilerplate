import { addUser } from 'src/db/repository/users';
import { BadRequestError } from '@utils/error';
import { Handler } from 'sn-types-backend';
import { InsertUser, SelectUser } from 'src/db/schema';

// Example - handler for nested route.

export const signup: Handler<InsertUser> = async (req, res) => {
    const { username, password, email } = req.body;

    const result = await addUser({ username, password, email });

    if (!result.status) {
        throw new BadRequestError(result.message);
    }

    return res.status(result.statusCode).send(result.payload);
};

export const getUser: Handler<SelectUser> = (_req, res) => {
    res.status(200).send({ name: 'John Doe', age: 30 });
};

export const createUser: Handler<SelectUser> = (req, res) => {
    console.log(req.body);

    return res.send('user created');
};
