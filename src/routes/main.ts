import { login } from 'src/handlers/auth';
import { signup } from '@handlers/auth';
import { requestLogger } from '@middleware/requestLogger';
import { userRouter } from './user';
import { Route } from 'sn-types-backend';

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
