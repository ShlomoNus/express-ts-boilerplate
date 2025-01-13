import { userRouter } from './user';
import { Route } from 'sn-types-backend';

export const routes: Route[] = [
    {
        method: 'use',
        path: '/users',
        middleware: [],
        handler: userRouter,
    },
];
