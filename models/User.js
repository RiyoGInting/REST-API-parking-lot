const moment = require("moment");

class User {
  constructor(plat_nomor, warna, tipe_mobil) {
    this.plat_nomor = plat_nomor;
    this.warna = warna;
    this.tipe_mobil = tipe_mobil;
    this.parking_lot = false;
    this.tanggal_masuk = moment().format("YYYY MM D, hh:mm a");
    this.tanggal_keluar = false;
  }
}

module.exports = User;
