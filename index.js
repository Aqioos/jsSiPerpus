const { sql, poolPromise } = require('./db');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query('SELECT * FROM Kategori');

    res.json({
      success: true,
      data: result.recordset
    });

  } catch (error) {
    console.error('❌ Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});