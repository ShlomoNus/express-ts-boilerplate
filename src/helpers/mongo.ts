import { connect } from 'mongoose';

export async function mongodbCreateConnection(url: string) {
    const result = await connect(url);

    const db = result.connection;

    db.on('error', error => {
        throw new Error(
            `Mongodb faild while connection to ${url} the error is ${error}.`
        );
    });
}
