import { Application, Router } from 'express';
import { Route } from 'sn-types-backend';

type ApplyRoutesParams = { app: Application | Router; routes: Route[] };

export function applyRoutes({ app, routes }: ApplyRoutesParams) {
    const workAround = app as Application;

    routes.forEach(route => {
        const { method, path, middleware, handler } = route;

        workAround[method](path, [...(middleware ?? [])], handler);
    });
}
