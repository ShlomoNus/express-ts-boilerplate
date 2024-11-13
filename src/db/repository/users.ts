import { convertType } from '@utils/types';
import { StatusCodes } from 'http-status-codes';
import { Result } from 'sn-types-general';
import { InsertUser, SelectUser, usersTable } from '../schema';
import { db } from '..';
import { and, eq } from 'drizzle-orm';

async function addUser(newUser: InsertUser) {
    let result: Result<string>;

    try {
        await db.insert(usersTable).values(newUser);
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

    return result;
}

async function getUser(id: number) {
    let result: Result<SelectUser>;

    try {
        const user = await db.select().from(usersTable).where(eq(usersTable.id, id));

        result = {
            status: true,
            payload: user[0],
            statusCode: StatusCodes.OK,
        };
    } catch (error: unknown) {
        const typedError = convertType<Error>(error);

        result = {
            status: false,
            message: typedError.message,
            statusCode: StatusCodes.BAD_REQUEST,
        };
    }

    return result;
}

async function findUser(user: Pick<InsertUser, 'email' | 'username'>) {
    const { email, username } = user;
    let result: Result<SelectUser>;

    try {
        const foundUser = await db
            .select()
            .from(usersTable)
            .where(and(eq(usersTable.email, email), eq(usersTable.username, username)));

        result = {
            status: true,
            payload: foundUser[0],
            statusCode: StatusCodes.OK,
        };
    } catch (error: unknown) {
        const typedError = convertType<Error>(error);

        result = {
            status: false,
            message: typedError.message,
            statusCode: StatusCodes.BAD_REQUEST,
        };
    }

    return result;
}

async function validateUser(user: InsertUser) {
    const { email, username, password } = user;
    let result: Result<SelectUser>;

    try {
        const foundUser = await db
            .select()
            .from(usersTable)
            .where(
                and(
                    eq(usersTable.email, email),
                    eq(usersTable.username, username),
                    eq(usersTable.password, password)
                )
            );

        result = {
            status: true,
            payload: foundUser[0],
            statusCode: StatusCodes.OK,
        };
    } catch (error: unknown) {
        const typedError = convertType<Error>(error);

        result = {
            status: false,
            message: typedError.message,
            statusCode: StatusCodes.BAD_REQUEST,
        };
    }

    return result;
}

export { addUser, getUser, findUser, validateUser };
