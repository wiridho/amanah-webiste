export const validasiStep = (value) => {
  const amount = parseFloat(value.replace(/[^\d.-]/g, "")); // Menghapus karakter non-angka dari value input
  if (amount % 50000 !== 0) {
    return "Kelipatan nominal harus Rp50.000!";
  }
  return true;
};

export const validasiBalance = (value, balance) => {
  const amount = parseFloat(value.replace(/[^\d.-]/g, ""));
  if (amount > balance) {
    return "Saldo anda tidak cukup!";
  }
  return true;
};
