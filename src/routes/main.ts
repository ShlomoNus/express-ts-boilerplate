import { home, login, signup } from 'handlers';
import { requestLogger } from 'middleware';
import { Route } from 'types';

export const routes: Route[] = [
    {
        method: 'get',
        path: '/',
        middleware: [],
        handler: home,
    },
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
];
