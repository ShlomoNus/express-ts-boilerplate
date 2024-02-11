import { Connection, connect } from 'mongoose';

let connection: Connection | undefined;

export async function mongodbCreateConnection(url: string) {
    const result = await connect(url);

    connection = result.connection;

    connection.on('error', error => {
        throw new Error(
            `Mongodb faild while connection to ${url} the error is ${error}.`
        );
    });
}

export async function mongodbDisconnect() {
    if (connection) {
        connection.close();
    }
}
