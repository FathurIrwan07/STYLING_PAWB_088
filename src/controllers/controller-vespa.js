// controllers/controller-vespa.js
const mysql = require("mysql2/promise");
const dbConfig = require("../configs/database"); // Memastikan koneksi database menggunakan pool
const pool = mysql.createPool(dbConfig);

module.exports = {
  // Fungsi untuk mengambil data Vespa
  async getVespa(req, res) {
    try {
      const [results] = await pool.execute("SELECT * FROM vespa;");
      res.render("vespa", {
        url: "http://localhost:5050/",
        vespa: results.length > 0 ? results : [],
      });
    } catch (err) {
      console.error("Error saat query:", err);
      res.status(500).send("Gagal mengambil data Vespa");
    }
  },

  // Fungsi untuk menyimpan data Vespa
  async saveVespa(req, res) {
    const { nama, warna, harga } = req.body;
    console.log({ nama, warna, harga }); // Memeriksa data yang diterima

    if (nama && warna && harga) {
      try {
        await pool.execute(
          "INSERT INTO vespa (nama, warna, harga) VALUES (?, ?, ?);",
          [nama, warna, harga]
        );
        req.flash("color", "success");
        req.flash("status", "Yes..");
        req.flash("message", "Data berhasil disimpan");
        res.redirect("/vespa");
      } catch (err) {
        console.error("Error saat menyimpan data:", err);
        res.send("Gagal menyimpan data");
      }
    } else {
      res.send("Data tidak lengkap");
    }
  },

  // Fungsi untuk memperbarui data Vespa
  async updateVespa(req, res) {
    const { id } = req.params;
    const { nama, warna, harga } = req.body;
    try {
      await pool.execute(
        "UPDATE vespa SET nama = ?, warna = ?, harga = ? WHERE id = ?",
        [nama, warna, harga, id]
      );
      res.redirect("/vespa");
    } catch (err) {
      console.error("Error saat memperbarui data:", err);
      res.send("Gagal memperbarui data");
    }
  },

  // Fungsi untuk menghapus data Vespa
  async deleteVespa(req, res) {
    const { id } = req.params;
    try {
      await pool.execute("DELETE FROM vespa WHERE id = ?", [id]);
      res.redirect("/vespa");
    } catch (err) {
      console.error("Error saat menghapus data:", err);
      res.send("Gagal menghapus data");
    }
  },

  // Fungsi untuk menampilkan halaman edit Vespa
  async editVespa(req, res) {
    const { id } = req.params;
    try {
      const [results] = await pool.execute("SELECT * FROM vespa WHERE id = ?", [
        id,
      ]);
      res.render("edit-vespa", { vespa: results[0] });
    } catch (err) {
      console.error("Error saat mengambil data untuk edit:", err);
      res.send("Gagal mengambil data Vespa");
    }
  },
};
