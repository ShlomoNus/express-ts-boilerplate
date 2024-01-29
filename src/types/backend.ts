import {
    Router,
    Request,
    Response,
    RequestHandler as Middleware,
} from 'express';

export type Handler<TBody = any, TParams = unknown, Tquery = unknown> = (
    req: Request<TParams, unknown, TBody, Tquery>,
    res: Response
) => any;

type Method =
    | 'get'
    | 'head'
    | 'post'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
    | 'patch'
    | 'use';

export type Route = {
    method: Method;
    path: string;
    middleware: Middleware[];
    handler: Handler | Router;
};
