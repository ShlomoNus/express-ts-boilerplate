import express from 'express';
import { applyRoutes } from 'helpers';
import { mongodbCreateConnection } from 'helpers/mongo';
import { routes } from 'routes';
import { config } from 'config';

mongodbCreateConnection(config.Base_Url + config.Default_End_Point);

const app = express();
const PORT = 3000;
const { json, urlencoded } = express;
app.use(json());
app.use(urlencoded({ extended: false }));

applyRoutes({ app, routes });

app.listen(PORT, () => {
    console.log(`Express with Typescript! http://localhost:${PORT}`);
});
