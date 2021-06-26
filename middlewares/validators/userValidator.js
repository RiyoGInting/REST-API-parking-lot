const database = require("../../database.json");
const { updateLots } = require("../../helpers/createLots");
let listLot = updateLots(database);

module.exports.checkIn = async (req, res, next) => {
  try {
    let errors = [];
    let types = ["SUV", "MPV"];
    let tipe = req.body.tipe_mobil;

    if (database.length == listLot.length) {
      return res.status(400).json({
        Message:
          "Maaf tempat parkir sedang penuh. Silahkan kembali beberapa saat lagi.",
      });
    }

    if (!types.includes(tipe)) {
      errors.push("Silahkan masukkan tipe kendaraan SUV atau MPV");
    }

    database.forEach((element) => {
      if (element.plat_nomor == req.body.plat_nomor) {
        errors.push(
          `Mobil dengan plat nomor ${req.body.plat_nomor} sudah parkir`
        );
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};
