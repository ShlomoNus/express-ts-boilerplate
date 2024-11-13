import { loadEnvFiles } from '@utils/vars';
import { cleanEnv, str, url, num } from 'envalid';

loadEnvFiles();

export const CONFIG = cleanEnv(process.env, {
    DATABASE_URL: url(),
    Port: num({ devDefault: 5050 }),
    Secret: str({ devDefault: '12345' }),
});
