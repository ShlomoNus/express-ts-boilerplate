import {
    Router,
    Request,
    Response,
    RequestHandler as Middleware,
} from 'express';

export type Handler = (req: Request, res: Response) => any;

export type RequestWithBody<T = unknown> = Request<unknown, unknown, T>;

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
