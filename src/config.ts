import { cleanEnv, str, url } from 'envalid';
import { loadEnvFiles } from 'helpers/vars';

loadEnvFiles();

export const config = cleanEnv(process.env, {
    Base_Url: url(),
    Default_End_Point: str(),
    Test_End_Point: str(),
});
