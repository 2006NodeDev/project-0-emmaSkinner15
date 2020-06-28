//entry point for all of the database files
import { Pool } from 'pg'

//build a connection pool
export const connectionPool:Pool = new Pool({
    host: process.env['LB_ADDRESS'],
    user: process.env['LB_DATABASE'],
    password:process.env['LB_PASSWORD'],
    database: process.env['LB_USERNAME'],
    port:5432,
    max:5 //max of connections created

})
    