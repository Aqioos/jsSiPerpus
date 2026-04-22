const sql = require('mssql/msnodesqlv8');

const config = {
  server: 'localhost\\SQLEXPRESS',
  database: 'SiPustaka',
  driver: 'ODBC Driver 18 for SQL Server',
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ SQL Server connected');
    return pool;
  })
  .catch(err => {
    console.error('❌ DB Connection Failed:', err);
  });

module.exports = { sql, poolPromise };