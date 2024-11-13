import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { CONFIG } from 'src/config';
export const db = drizzle(CONFIG.DATABASE_URL);