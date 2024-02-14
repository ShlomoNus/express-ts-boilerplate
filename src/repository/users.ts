import { UserModel } from 'models/user';
import { User } from 'types';

// change it to your own source db, json ect ect.
const users: User[] = [];

export const addUser = (newUser: User) => {
    const createdUser = new UserModel({ ...newUser });

    createdUser.save();
};

export const getUser = (user: User) => {
    return users.find(
        u => u.username === user.username && u.password === user.password
    );
};
