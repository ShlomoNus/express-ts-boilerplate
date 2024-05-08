import { cleanEnv, str, url, num } from 'envalid';
import { loadEnvFiles } from 'helpers/vars';

loadEnvFiles();

export const CONFIG = cleanEnv(process.env, {
    Base_Url: url({ devDefault: 'mongodb://127.0.0.1:27017/' }),
    Default_End_Point: str({ devDefault: 'Test' }),
    Test_End_Point: str(),
    Port: num({ devDefault: 8080 }),
    Secret: str({ devDefault: '12345' }),
});
