import http from 'http';
import express, { json, urlencoded } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import { applyRoutes } from '@utils/backend';
import { Optional, Route } from 'shen-types';

const app = express();

export async function server(port: number, routes: Route[]): Promise<Optional<http.Server>> {
    try {
        app.use(helmet());

        app.use(cors());

        app.use(compression());
        app.use(json());
        app.use(urlencoded({ extended: false }));
        applyRoutes({ app, routes });

        return http.createServer(app).listen(port, () => {
            console.info(`Express with Typescript! http://localhost:${port}`);
        });
    } catch (error) {
        console.info(error);

        return null;
    }
}
