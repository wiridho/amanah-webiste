import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/atom";
import { FormatMataUang } from "../../../utils/FormatMataUang";
import { postLoanDisbursement } from "../../../service/Borrower/borrower";
import { useNavigate } from "react-router-dom";

const KonfirmasiPencairanPinjaman = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { loanHistory } = useSelector((state) => state.borrower);
  const { bankSelected } = useSelector((state) => state.balance_transaction);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    const data = {
      loanId: loanHistory?.active?.loanId,
      bankId: bankSelected?._id,
    };
    postLoanDisbursement({ accessToken, navigate, data });
  };

  return (
    <div>
      <div className="h-screen flex justify-center items-center font-nunito-sans">
        <div className="w-1/3 rounded-md shadow bg-white">
          <div className="p-8">
            <div className="flex flex-col gap-8">
              <span className="text-2xl mb-2 text-center font-semibold">
                Konfirmasi Pencairan Dana
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span>Jumlah Pinjaman</span>
                  <span>{FormatMataUang(loanHistory?.active?.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Imbal Hasil</span>
                  <span>
                    {FormatMataUang(loanHistory?.active?.yieldReturn)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tenor</span>
                  <span>{loanHistory?.active?.tenor}</span>
                </div>

                <div className="flex justify-between">
                  <span>Kontrak</span>
                  <a
                    className="underline text-blue-500"
                    href={loanHistory?.active?.contract}
                    target="_blank"
                  >
                    Lihat Kontrak
                  </a>
                </div>
              </div>
              <div>
                <Button
                  onClick={onClick}
                  className={`px-4 py-2 bg-blue-700 hover:bg-blue-900 w-full text-white
              `}
                >
                  Cairkan Dana Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiPencairanPinjaman;
