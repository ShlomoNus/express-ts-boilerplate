import { InsertUser } from '@db/schema';

export type FindUserType = Pick<InsertUser, 'email' | 'username'>;
