import { Handler } from 'sn-types-backend';
import { addUser } from 'repository';
import { User } from 'types';

// Example - handler for nested route.
export const signup: Handler<User> = (req, res) => {
    const { username, password } = req.body;
    if (!username?.trim() || !password?.trim()) {
        return res.status(400).send('Bad username or password');
    }
    addUser({ username, password });
    return res.status(201).send('User created');
};
