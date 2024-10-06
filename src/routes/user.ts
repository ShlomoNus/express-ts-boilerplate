import { getUser } from '@handlers/user';
import { applyRoutes } from '@utils/backend';
import { Router } from 'express';
import { Route } from 'sn-types-backend';

const userRouter = Router();

export const routes: Route[] = [{ path: '/get', method: 'get', handler: getUser }];

applyRoutes({ app: userRouter, routes });
userRouter.get('/create', (_, res) => {
    res.send('kajdia');
});

export { userRouter };
