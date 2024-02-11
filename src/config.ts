import { cleanEnv, num } from 'envalid';
import { loadEnvFiles } from 'helpers/vars';

loadEnvFiles();

export const CONFIG = cleanEnv(process.env, {
    Port: num(),
});

export default CONFIG;
