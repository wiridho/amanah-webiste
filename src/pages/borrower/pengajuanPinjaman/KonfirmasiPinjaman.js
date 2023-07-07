import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import { Button } from "../../../components/atom";
import { postBorrowersLoan } from "../../../service/Borrower/borrower";
import { useDispatch, useSelector } from "react-redux";

const KonfirmasiPinjaman = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const {
    amount,
    borrowingCategory,
    paymentSchema,
    purpose,
    tenor,
    yieldReturn,
  } = state;

  console.log(state);
  const onClick = () => {
    dispatch(
      postBorrowersLoan({
        accessToken,
        data: state,
        navigate: () => navigate("/borrower"),
      })
    );

    // navigate("/borrower/preview-kontrak", {
    //   state: state,
    // });
  };

  return (
    <div className="h-screen flex justify-center items-center font-nunito-sans">
      <div className="w-1/3 rounded-md shadow bg-white">
        <div className="p-8">
          <div className="flex flex-col gap-8">
            <span className="text-2xl mb-2 text-center font-semibold">
              Konfirmasi Pinjaman
            </span>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span>Jumlah Pinjaman</span>
                <span>{FormatMataUang(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Imbal Hasil</span>
                <span>{FormatMataUang(yieldReturn)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tenor</span>
                <span>{tenor}</span>
              </div>
              <div className="flex justify-between">
                <span>Skema Pembayaran</span>
                <span>{paymentSchema}</span>
              </div>
              <div className="flex justify-between">
                <span>Kategori Peminjaman</span>
                <span>{borrowingCategory}</span>
              </div>
              <div className="flex justify-between">
                <span>Tujuan Peminjaman</span>
                <span>{purpose}</span>
              </div>
            </div>
            <div>
              <Button
                onClick={onClick}
                className={`px-4 py-2 bg-blue-500 hover:bg-blue-700 w-full text-white
              `}
              >
                Ajukan Pinjaman
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiPinjaman;
