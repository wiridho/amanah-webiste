// export const FormatMataUang = (number) => {
//   return new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//   }).format(number);
// };

// export const FormatMataUang = (number) => {
//   const formattedCurrency = new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(number);

//   const currencyRegex = /^(IDR \d+(?:\.\d{3})*(?:,\d+)?)\.00$/;
//   const match = formattedCurrency.match(currencyRegex);
//   if (match) {
//     return match[1];
//   }

//   return formattedCurrency;
// };

// export const FormatMataUang = (number) => {
//   const formattedCurrency = new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(number);

//   const currencyRegex = /^(IDR)\s(\d+(?:\.\d{3})*(?:,\d+)?)\.00$/;
//   const match = formattedCurrency.match(currencyRegex);
//   if (match) {
//     return match[1] + match[2];
//   }

//   return formattedCurrency;
// };

export const FormatMataUang = (number) => {
  const formattedCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);

  const currencyRegex = /^(Rp)\s(.+)$/;
  const match = formattedCurrency.match(currencyRegex);
  if (match) {
    return match[1] + match[2];
  }

  return formattedCurrency;
};
