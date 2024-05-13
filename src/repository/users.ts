import { CONFIG } from 'config';
import { mongodbCreateConnection } from 'helpers/mongo';
import { UserModel } from 'models/user';
import { User } from 'types';

// change it to your own source db, json ect ect.
const users: User[] = [];

export const addUser = async (newUser: User) => {
    const disconnectFunction = await mongodbCreateConnection(
        CONFIG.Mongo_Base_Url + CONFIG.Mongo_DB
    );
    const createdUser = new UserModel({ ...newUser });

    await createdUser.save();

    await disconnectFunction();
};

export const getUser = (user: User) => {
    return users.find(
        u => u.username === user.username && u.password === user.password
    );
};
