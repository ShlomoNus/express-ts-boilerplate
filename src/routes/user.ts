import { login, signup } from '@handlers/auth';
import { applyRoutes } from '@utils/backend';
import { Router } from 'express';
import { Route } from 'sn-types-backend';

const userRouter = Router();

export const routes: Route[] = [
    { path: '/login', method: 'post', handler: login },
    { path: '/signup', method: 'post', handler: signup },

    // { path: '/reset', method: 'post', handler: resetPassword },
];

applyRoutes({ app: userRouter, routes });

export { userRouter };
