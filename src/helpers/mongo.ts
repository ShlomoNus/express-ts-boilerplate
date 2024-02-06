import { connect, ConnectOptions } from 'mongoose';

export async function mongodbCreateConnection(url: string) {
    const result = await connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);

    const db = result.connection;

    db.on('error', error => {
        throw new Error(
            `Mongodb faild while connection to ${url} the error is ${error}.`
        );
    });

    db.once('open', () => {
        console.log(`MongoDB connected to ${url}.`);
    });
}
