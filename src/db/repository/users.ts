import { convertType } from '@utils/types';
import { StatusCodes } from 'http-status-codes';
import { Result } from 'sn-types-general';
import { InsertUser, SelectUser, usersTable } from '../schema';
import { db } from '..';
import { eq } from 'drizzle-orm';



async function addUser  (newUser: InsertUser)  {
   

    let result: Result<string>;

    try {
    await    db.insert(usersTable).values(newUser)
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
};

async function getUser (id: number){

    let result: Result<SelectUser>;

    try {
      const user =  await db.select().from(usersTable).where(eq(usersTable.id,id))
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
