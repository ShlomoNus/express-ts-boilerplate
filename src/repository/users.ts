import { StatusCodes } from 'http-status-codes';

import { CONFIG } from 'config';
import { ConvertType } from 'helpers';
import { mongodbCreateConnection } from 'helpers/mongo';
import { UserModel } from 'models/user';
import { Result } from 'sn-types-general';
import { User } from 'types';

// change it to your own source db, json ect ect.
const users: User[] = [];

export const addUser = async (newUser: User) => {
    const disconnectFunction = await mongodbCreateConnection(
        CONFIG.Mongo_Base_Url + CONFIG.Mongo_DB
    );

    let result: Result<string>;
    try {
        const createdUser = new UserModel({ ...newUser });
        await createdUser.save();
        result = {
            status: true,
            payload: 'User created',
            statusCode: StatusCodes.CREATED,
        };
    } catch (error: unknown) {
        const typedError = ConvertType<Error>(error);
        result = {
            status: false,
            message: typedError.message,
            statusCode: StatusCodes.NOT_FOUND,
        };
    }

    await disconnectFunction();

    return result;
};

export const getUser = (user: User) => {
    return users.find(
        u => u.username === user.username && u.password === user.password
    );
};
