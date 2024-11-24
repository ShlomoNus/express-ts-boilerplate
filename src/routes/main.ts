import { login } from 'src/handlers/auth';
import { signup } from '@handlers/auth';
import { requestLogger } from '@middleware/requestLogger';
import { Route } from 'sn-types-backend';
import { userRouter } from './user';

export const routes: Route[] = [
    {
        method: 'post',
        path: '/login',
        middleware: [requestLogger],
        handler: login,
    },
    {
        method: 'post',
        path: '/signup',
        middleware: [],
        handler: signup,
    },
    {
        method: 'use',
        path: '/users',
        middleware: [],
        handler: userRouter,
    },
];
