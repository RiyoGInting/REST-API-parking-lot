const ParkingLot = require("../models/lot");
const database = require("../database.json");

// create lot based on value of n
let n = 25;
const createLots = (n) => {
  const lots = [];

  let i = 1;
  while (i <= n) {
    let newLot = new ParkingLot(`A${i}`);

    lots.push({
      lot: newLot.lot,
      isEmpty: newLot.isEmpty,
    });
    i++;
  }

  return lots;
};

const listLot = createLots(n);

// // update listLot based on data in database
exports.updateLots = (data) => {
  for (let i = 0; i < listLot.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[j].parking_lot == listLot[i].lot) {
        listLot[i].isEmpty = false;
      }
    }
  }

  return listLot;
};
