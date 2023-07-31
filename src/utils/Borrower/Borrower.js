export const checkStatusLoan = (status) => {
  let statusLoan = "";

  if (status === "on request" || status === "on process") {
    statusLoan = "Menunggu Pendanaan";
  } else if (status === "pending") {
    statusLoan = "Pending";
  } else if (status === "in borrowing" || status === "Belum dicairkan") {
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

export const statusLoanActive = (status) => {
  let statusLoan = "";

  if (status === "on request" || status === "on process") {
    statusLoan = (
      <span className="text-yellow-400 bg-yellow-50 px-2 rounded">
        Menunggu Pendanaan
      </span>
    );
  } else if (status === "pending") {
    statusLoan = (
      <span className="text-yellow-400 bg-yellow-50 px-2 rounded">Pending</span>
    );
  } else if (status === "in borrowing" || status === "Belum dicairkan") {
    statusLoan = (
      <span className="text-indigo-400 bg-indigo-50 px-2 rounded">
        Pinjaman Terkumpul
      </span>
    );
  } else if (status === "disbursement") {
    statusLoan = (
      <span className="text-indigo-400 bg-indigo-50 px-2 rounded">
        Sudah Dicairkan
      </span>
    );
  } else if (status === "repayment") {
    statusLoan = (
      <span className="text-green-400 bg-green-50 px-2 rounded">
        Sudah Dibayar
      </span>
    );
  } else if (status === "late repayment") {
    statusLoan = (
      <span className="text-green-400 bg-green-50 px-2 rounded">
        Dibayar Terlambat
      </span>
    );
  }

  return statusLoan;

  // const statusWaiting = ["on request", "on process"];
  // const statusSelesai = ["Repayment", "late repayment"];

  // if (statusWaiting.includes(params)) {
  //   status = (
  //     <span className="text-yellow-400 bg-yellow-50 px-2 rounded">
  //       Menunggu Pendanaan
  //     </span>
  //   );
  // }
  // if (params === "disbursement") {
  //   status = (
  //     <span className="text-indigo-400 bg-indigo-50 px-2 rounded">
  //       Sudah Dicairkan
  //     </span>
  //   );
  // }
  // if (params === "in borrowing") {
  //   status = (
  //     <span className="text-indigo-400 bg-indigo-50 px-2 rounded">
  //       Pinjaman Terkumpul
  //     </span>
  //   );
  // }
  // if (statusSelesai.includes(params)) {
  //   status = (
  //     <span className="text-green-400 bg-green-50 px-2 rounded">
  //       Pinjaman Sudah Lunas
  //     </span>
  //   );
  // }
  // return status;
};

function getStatusClass(status) {
  if (status === "paid") {
    return "text-green-500 bg-green-50";
  } else if (status === "unpaid") {
    return "text-red-500 bg-red-50";
  } else {
    return "text-white bg-green-700";
  }
}

export const sisaPembayaran = (collection) => {
  let sisa = 0;
  for (let i = 0; i < collection?.length; i++) {
    if (collection[i]?.status === "unpaid") {
      sisa += collection[i]?.amount;
    }
  }
  return sisa;
};

export const digitKTP = (value) => {
  const regex = /^\d{16}$/;
  return regex.test(value) || "Please enter a valid 16-digit number";
};
