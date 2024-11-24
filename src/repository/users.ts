import { UserModel } from '@models/user';
import { CONFIG } from '@src/config';
import { IUser } from '@src/types/user';
import { convertToError, convertType } from '@utils/types';
import { StatusCodes } from 'http-status-codes';
import { Result } from 'sn-types-general';
import { mongodbCreateConnection } from 'src/helpers/mongo';

// Change it to your own source db, json ect ect.
const users: IUser[] = [];


export const addUser = async (newUser: IUser) => {
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


export async function getUser(id: number) {

    const disconnectFunction = await mongodbCreateConnection(
        CONFIG.Mongo_Base_Url + CONFIG.Mongo_DB
    );
    let result: Result<IUser>;

    try {
        const user = await UserModel.findById(id).lean<IUser>()
        if(!user){
            throw new Error(`no user with ${id} id`)
        }
        result = {
            status: true,
            payload: user,
            statusCode: StatusCodes.OK,
        };
    } catch (error: unknown) {
        const typedError = convertToError(error);

        result = {
            status: false,
            message: typedError.message,
            statusCode: StatusCodes.BAD_REQUEST,
        };
    }

    await disconnectFunction();

    return result;
}

export async function findUser(user:IUser) {
    const disconnectFunction = await mongodbCreateConnection(
        CONFIG.Mongo_Base_Url + CONFIG.Mongo_DB
    );
    let result: Result<IUser>;

    try {
        const foundUser = await UserModel.find({...user}).lean<IUser>()
        if(!user){
            throw new Error('please check again the provided user info')
        }
        result = {
            status: true,
            payload: foundUser,
            statusCode: StatusCodes.OK,
        };
    } catch (error: unknown) {
        const typedError = convertToError(error);

        result = {
            status: false,
            message: typedError.message,
            statusCode: StatusCodes.BAD_REQUEST,
        };
    }

    return result;
}

