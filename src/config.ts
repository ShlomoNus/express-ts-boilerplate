import { loadEnvFiles } from '@utils/vars';
import { cleanEnv, str, url, num } from 'envalid';

loadEnvFiles();

export const CONFIG = cleanEnv(process.env, {
    BASE_URL: url({ devDefault: 'mongodb://127.0.0.1:27017/' }),
    DB_NAME: str({ devDefault: 'localUsers' }),
    Port: num({ devDefault: 5050 }),
    Secret: str({ devDefault: '12345' }),
});
