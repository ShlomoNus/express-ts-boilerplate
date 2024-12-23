import { getUser } from '@handlers/auth';
import { applyRoutes } from '@utils/backend';
import { Router } from 'express';
import { Route } from 'sn-types-backend';

const userRouter = Router();

export const routes: Route[] = [{ path: '/get', method: 'get', handler: getUser }];

applyRoutes({ app: userRouter, routes });

export { userRouter };
