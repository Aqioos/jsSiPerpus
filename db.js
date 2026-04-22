const sql = require('mssql');

const config = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
  },
  driver: 'msnodesqlv8',
};

const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Connected with Windows Auth');
    return pool;
  } catch (err) {
    console.error('❌ Connection failed:', err);
    throw err;
  }
};

module.exports = { sql, connectDB };