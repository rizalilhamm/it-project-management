const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to existing database in parent project folder
const dbPath = path.resolve(__dirname, '../../itpm.db');

// Initialize database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at', dbPath);
  }
});

/**
 * Execute a SQL query with optional parameters.
 * Automatically determines whether to use `all` (for SELECT)
 * or `run` (for INSERT/UPDATE/DELETE).
 *
 * @param {string} sql - The SQL query string
 * @param {Array} [params=[]] - Query parameters
 * @returns {Promise<object|Array>} Query result
 */
function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    const isSelect = sql.trim().toLowerCase().startsWith('select');
    const method = isSelect ? 'all' : 'run';

    db[method](sql, params, function (err, result) {
      if (err) {
        console.error('❗ SQL Error:', err.message);
        return reject(err);
      }

      if (isSelect) {
        resolve(result);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
}

module.exports = { db, query };
