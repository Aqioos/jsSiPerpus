const { sql, poolPromise } = require('./db');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/kategori', async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query('SELECT * FROM Kategori');

    res.json({
      success: true,
      data: result.recordset
    });

  console.log(result.recordset);

  } catch (error) {
    console.error('❌ Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/kategori', async (req, res) => {
  try {
    const { id_Kategori, Nama_Kategori } = req.body;
    console.log('Received data:', { id_Kategori, Nama_Kategori });
    const pool = await poolPromise;

   const result = await pool.request()
  .input('id_Kategori', id_Kategori)
  .input('Nama_Kategori', Nama_Kategori)
  .query('INSERT INTO Kategori (id_Kategori, Nama_Kategori) VALUES (@id_Kategori, @Nama_Kategori)');

    res.json({
      success: true,  
      data: {
        id: id_Kategori,
        nama: Nama_Kategori
      }
    });

 //  console.log(result.recordset);

  } catch (error) {
    console.error('❌ Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/kategori/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Nama_Kategori } = req.body;
    console.log('Received data:', { id, Nama_Kategori });
    const pool = await poolPromise;

    const result = await pool.request()
      .input('id_Kategori', id)
      .input('Nama_Kategori', Nama_Kategori)
      .query('UPDATE Kategori SET Nama_Kategori = @Nama_Kategori WHERE id_Kategori = @id_Kategori');

    res.json({
      success: true,
      data: result.recordset
    });

  } catch (error) {
    console.error('❌ Error updating data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/kategori/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received id for deletion:', id);
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_Kategori', id)
      .query('DELETE FROM Kategori WHERE id_Kategori = @id_Kategori');
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/buku', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Buku');
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/buku', async (req, res) => {
  try {
    const { id_Buku, Judul_Buku, id_Kategori, Pengarang, Penerbit, Tahun_Terbit, Stok } = req.body;
    console.log('Received data:', { id_Buku, Judul_Buku, id_Kategori, Pengarang, Penerbit, Tahun_Terbit, Stok });
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_Buku', id_Buku)
      .input('Judul_Buku', Judul_Buku)
      .input('id_Kategori', id_Kategori)
      .input('Pengarang', Pengarang)
      .input('Penerbit', Penerbit)
      .input('Tahun_Terbit', Tahun_Terbit)
      .input('Stok', Stok)
      .query('INSERT INTO Buku (id_Buku, Judul, id_Kategori, Pengarang, Penerbit, Tahun_Terbit, Stok) VALUES (@id_Buku, @Judul_Buku, @id_Kategori, @Pengarang, @Penerbit, @Tahun_Terbit, @Stok)');
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('❌ Error inserting data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/buku/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Judul, id_Kategori, Pengarang, Penerbit, Tahun_Terbit, Stok } = req.body;
    console.log('Received data:', { id, Judul, id_Kategori });
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_Buku', id)
      .input('Judul', Judul)
      .input('id_Kategori', id_Kategori)
      .query('UPDATE Buku SET Judul = @Judul, id_Kategori = @id_Kategori WHERE id_Buku = @id_Buku');
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) {
    console.error('❌ Error updating data:', error);
    res.status(500).send('Internal Server Error');

  }
});

app.delete('/buku/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received id for deletion:', id);
    const pool = await poolPromise;
    const result = await pool.request()


      .input('id_Buku', id)
      .query('DELETE FROM Buku WHERE id_Buku = @id_Buku');
    res.json({
      success: true,
      data: result.recordset
    });
  } catch (error) { 
    console.error('❌ Error deleting data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});