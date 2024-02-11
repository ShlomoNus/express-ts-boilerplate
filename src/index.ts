import { server } from 'server';
import { routes } from 'routes';
import { mongodbCreateConnection } from 'helpers/mongo';

import { CONFIG } from 'config';

mongodbCreateConnection(CONFIG.Base_Url + CONFIG.Default_End_Point);

const port = CONFIG.Port || 3000;

server(port, routes);
