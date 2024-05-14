import { model, Schema, Model } from 'mongoose';

interface IUser {
    username: string;
    password: string;
    email: string;
}

const UserSchema = new Schema<IUser>({
    username: { type: 'String', required: true },
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
    return `name is ${this.username}, email ${this.email}`;
});

UserSchema.index({ email: 1 });

export const UserModel = model<IUser, IUserModel>('User', UserSchema);
