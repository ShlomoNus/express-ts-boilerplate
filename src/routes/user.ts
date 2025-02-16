import { login, signup } from '@handlers/auth';
import { applyRoutes } from '@utils/backend';
import { Router } from 'express';
import { Route } from 'sn-types-backend';

const userRouter = Router();

export const routes: Route[] = [
    { path: '/login', method: 'post', handler: login },
    { path: '/signup', method: 'post', handler: signup },
];

applyRoutes({ app: userRouter, routes });

export { userRouter };
