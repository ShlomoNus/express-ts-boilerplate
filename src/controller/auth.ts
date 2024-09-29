import { getUser } from '@repository/users';
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
