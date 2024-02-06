import { model, Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
    name: string;
    password: string;
    email: string;
}

const UserSchema = new Schema<IUser>({
    name: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true },
    email: { type: 'String', required: true, unique: true },
});

interface IUserModel extends Model<IUser> {
    findByTitle(title: string): Promise<IUser | null>;
}

// add model function
UserSchema.statics.findByEmail = function findByEmail(
    email: string
): Promise<IUser | null> {
    return this.findOne({ email }).exec();
};

UserSchema.virtual('userData').get(function getUserData(this: IUser) {
    return `name is ${this.name}, email ${this.email}`;
});

export const UserModel = model<IUser, IUserModel>('User', UserSchema);
