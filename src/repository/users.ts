import { StatusCodes } from 'http-status-codes';
import { CONFIG } from 'config';
import { convertType } from 'helpers';
import { mongodbCreateConnection } from 'helpers/mongo';
import { userModel } from 'models/user';
import { Result } from 'sn-types-general';
import { User } from 'types';

// Change it to your own source db, json ect ect.
const users: User[] = [];

export const addUser = async (newUser: User) => {
    const disconnectFunction = await mongodbCreateConnection(
        CONFIG.Mongo_Base_Url + CONFIG.Mongo_DB
    );

    let result: Result<string>;

    try {
        const createdUser = new userModel({ ...newUser });

        await createdUser.save();
        result = {
            status: true,
            payload: 'User created',
            statusCode: StatusCodes.CREATED,
        };
    } catch (error: unknown) {
        const typedError = convertType<Error>(error);

        result = {
            status: false,
            message: typedError.message,
            statusCode: StatusCodes.NOT_FOUND,
        };
    }

    await disconnectFunction();

    return result;
};

export const getUser = (user: User) =>
    users.find(
        u => u.username === user.username && u.password === user.password
    );
