const User = require("../models/User");
const moment = require("moment");
const database = require("../database.json");
const { calculateCost } = require("../helpers/calculateCost");
const { updateLots } = require("../helpers/createLots");
let listLot = updateLots(database);

class UserController {
  getAll(req, res) {
    try {
      return res.status(200).json(database);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  getByFilter(req, res) {
    try {
      let data = [];
      database.forEach((element) => {
        if (req.query.tipe && element.tipe_mobil == req.query.tipe) {
          data.push(element);
        } else if (req.query.warna && element.warna == req.query.warna) {
          data.push(element.plat_nomor);
        }
      });

      if (data.length == 0) {
        return res.status(404).json({
          message: "Data not found",
        });
      } else if (req.query.tipe) {
        return res.status(200).json({
          jumlah_kendaraan: data.length,
        });
      } else if (req.query.warna) {
        return res.status(200).json({
          plat_nomor: data,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        error: error.message,
      });
    }
  }

  checkIn(req, res) {
    try {
      const newUser = new User(
        req.body.plat_nomor,
        req.body.warna,
        req.body.tipe_mobil
      );
      newUser.parking_lot = `A${database.length + 1}`;
      database.push(newUser);

      // this function will update lots list every time user checkIn
      listLot = updateLots(database);
      console.log("after checkin", listLot);

      return res.json({
        plat_nomor: newUser.plat_nomor,
        parking_lot: newUser.parking_lot,
        tanggal_masuk: newUser.tanggal_masuk,
      });
    } catch (error) {
      return res.send(error.message);
    }
  }

  checkOut(req, res) {
    try {
      let data;
      database.forEach((element) => {
        if (element.plat_nomor == req.query.plat_nomor) {
          data = element;
        }
      });

      data.tanggal_keluar = moment().format("YYYY MM D, hh:mm a");

      // call calculateCost function to count the cost
      calculateCost(data);

      return res.json({
        plat_nomor: data.plat_nomor,
        tanggal_masuk: data.tanggal_masuk,
        tanggal_keluar: data.tanggal_keluar,
        jumlah_bayar: data.jumlah_bayar,
      });
    } catch (error) {
      return res.send(error.message);
    }
  }
}

module.exports = new UserController();
