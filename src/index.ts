import { CONFIG } from 'config';
import { server } from 'server';
import { routes } from 'routes';

const port = CONFIG.Port || 3000;

server(port, routes);
