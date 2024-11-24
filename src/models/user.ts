import { IUser } from '@src/types/user';
import { model, Schema, Model } from 'mongoose';


const UserSchema = new Schema<IUser>({
    username: { type: 'String', required: true },
    password: { type: 'String', required: true },
    email: { type: 'String', required: true, unique: true },
});

interface IUserModel extends Model<IUser> {
    findByTitle(title: string): Promise<IUser | null>;
}

// Add model function
UserSchema.statics.findByEmail = async function findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email }).exec();
};

UserSchema.virtual('userData').get(function getUserData(this: IUser) {
    return `name is ${this.username}, email ${this.email}`;
});

UserSchema.index({ email: 1 });

export const UserModel = model<IUser, IUserModel>('User', UserSchema);
