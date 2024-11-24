import { Connection, connect } from 'mongoose';

export async function mongodbDisconnect(connection: Connection) {
    connection.close();
}

export async function mongodbCreateConnection(url: string) {
    const result = await connect(url);

    const currentConnection = result.connection;

    currentConnection.on('error', error => {
        throw new Error(`Mongodb faild while connection to ${url} the error is ${error}.`);
    });

    return async () => mongodbDisconnect(currentConnection);
}
