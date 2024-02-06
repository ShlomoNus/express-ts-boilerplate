import { getUser } from 'repository';
import { Handler } from 'sn-types-backend';

// change logic as you wish.
export const login: Handler = (req, res) => {
    const { username, password } = req.body;
    const found = getUser({ username, password });
    if (!found) {
        return res.status(401).send('Login failed');
    }
    return res.status(200).send('Success');
};
