import { login } from '@controller/auth';
import { getUser, signup } from '@controller/user';
import { requestLogger } from '@middleware/requestLogger';
import { Route } from 'sn-types-backend';

export const routes: Route[] = [
    {
        method: 'post',
        path: '/users',
        middleware: [],
        handler: signup,
    },

    {
        method: 'post',
        path: '/login',
        middleware: [requestLogger],
        handler: login,
    },
    {
        method: 'get',
        path: '/test',
        middleware: [],
        handler: getUser,
    },
];
