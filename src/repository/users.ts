import { User } from 'types';

// change it to your own source db, json ect ect.
const users: User[] = [];

export const addUser = (newUser: User) => {
    users.push(newUser);
};

export const getUser = (user: User) => {
    return users.find(
        u => u.username === user.username && u.password === user.password
    );
};
