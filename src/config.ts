import { cleanEnv, str, url, num } from 'envalid';
import { loadEnvFiles } from 'helpers/vars';

loadEnvFiles();

export const CONFIG = cleanEnv(process.env, {
    Mongo_Base_Url: url({ devDefault: 'mongodb://127.0.0.1:27017/' }),
    Mongo_DB: str({ devDefault: 'test' }),
    Port: num({ devDefault: 5050 }),
    Secret: str({ devDefault: '12345' }),
});
