export const estimasiImbalHasil = ({
  totalPinjaman,
  totalImbalHasil,
  getInputValue,
}) => {
  return totalImbalHasil * (getInputValue / totalPinjaman);
};
