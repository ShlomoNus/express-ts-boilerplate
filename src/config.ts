import { cleanEnv, num, str } from 'envalid';
import { loadEnvFiles } from 'helpers/vars';

loadEnvFiles();

export const CONFIG = cleanEnv(process.env, {
    Port: num(),
    Secret: str(),
});
