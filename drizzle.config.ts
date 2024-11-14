import { defineConfig } from 'drizzle-kit';
import { CONFIG } from 'src/config';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: CONFIG.DATABASE_URL,
    },
});
