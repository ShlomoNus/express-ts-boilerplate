import express from 'express';
import { applyRoutes } from 'helpers';
import { loadEnvFiles } from 'helpers/vars';
import { routes } from 'routes';

loadEnvFiles();

const app = express();
const PORT = 3000;
const { json, urlencoded } = express;
app.use(json());
app.use(urlencoded({ extended: false }));

applyRoutes({ app, routes });

app.listen(PORT, () => {
    console.log(`Express with Typescript! http://localhost:${PORT}`);
});
