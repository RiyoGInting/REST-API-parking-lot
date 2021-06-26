exports.calculateCost = (data) => {
  const start = new Date(data.tanggal_masuk);
  const end = new Date();
  const diffTime = Math.abs(end - start);
  const duration = Math.floor(diffTime / 60 / 1000);

  if (data.tipe_mobil == "SUV" && duration < 60) {
    let cost = 25000 / 60;
    data.jumlah_bayar = Math.round(cost * duration).toString();
  } else if (data.tipe_mobil == "MPV" && duration < 60) {
    let cost = 35000 / 60;
    data.jumlah_bayar = Math.round(cost * duration).toString();
  } else if (data.tipe_mobil == "SUV" && duration > 60) {
    let firstHour = 25000;
    let nextHour = (firstHour * 20) / 100 / 60;
    let totalCost = (duration - 60) * nextHour + firstHour;
    data.jumlah_bayar = Math.round(totalCost).toString();
  } else if (data.tipe_mobil == "MPV" && duration > 60) {
    let firstHour = 35000;
    let nextHour = (firstHour * 20) / 100 / 60;
    let totalCost = (duration - 60) * nextHour + firstHour;
    data.jumlah_bayar = Math.round(totalCost).toString();
  }
};
