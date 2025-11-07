const { Pool } = require('pg');

// Use environment variables for connection details
const connectionString = {
    host: process.env.POSTGRES_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'itpm_user',
    password: process.env.POSTGRES_PASSWORD || 'itpm_secret',
    database: process.env.POSTGRES_DB || 'itpm_database',
    port: process.env.POSTGRES_PORT || 5432,
    // Note: In production, you would add SSL configuration here.
};

// Create a connection pool
const pool = new Pool(connectionString);

pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle PostgreSQL client', err);
    // Exit the process to allow the container to restart if the connection is lost
    // process.exit(-1); 
});

/**
 * Execute a SQL query with optional parameters.
 *
 * @param {string} sql - The SQL query string
 * @param {Array} [params=[]] - Query parameters
 * @returns {Promise<Array>} Query result rows
 */
function query(sql, params = []) {
    // The pg pool uses 'query' for all operations (SELECT, INSERT, etc.)
    return pool.query(sql, params)
        .then(res => {
            // For SELECT, we return the rows
            if (sql.trim().toLowerCase().startsWith('select')) {
                return res.rows;
            } 
            
            // For INSERT/UPDATE/DELETE, we return metadata
            // Note: pg doesn't use lastID/changes directly like SQLite.
            // For getting the last ID, you must append 'RETURNING id' to your INSERT query.
            return { rowCount: res.rowCount };
        })
        .catch(err => {
            console.error('❗ PostgreSQL Query Error:', err.message, 'SQL:', sql);
            throw err; // Re-throw the error for the calling service/controller to handle
        });
}

// Export the query function and the pool (in case a direct client is needed)
module.exports = { pool, query };