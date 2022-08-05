import * as dotenv from 'dotenv';
const path = require('path');
function loadEnv() {
    const pathOfEnv = path.resolve(
        process.cwd(),
        process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.production',
    );
    dotenv.config({ path: pathOfEnv });
}
loadEnv();
