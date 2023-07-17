export const checkStatusLoan = (status) => {
  let statusLoan = "";

  if (status === "on request" || status === "on process") {
    statusLoan = "Menunggu Pendanaan";
  } else if (status === "in borrowing") {
    statusLoan = "Dana Terkumpul";
  } else if (status === "disbursement") {
    statusLoan = "Sudah dicairkan";
  } else if (status === "repayment") {
    statusLoan = "Sudah Dibayar";
  } else if (status === "late repayment") {
    statusLoan = "Dibayar Terlambat";
  }

  return statusLoan;
};

export const sisaPembayaran = (collection) => {
  let sisa = 0;
  for (let i = 0; i < collection?.length; i++) {
    if (collection[i]?.status === "unpaid") {
      sisa += collection[i]?.amount;
    }
  }
  return sisa;
};
