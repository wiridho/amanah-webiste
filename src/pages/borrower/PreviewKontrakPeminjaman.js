import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Message } from "../../components/atom";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../store/reducer/Borrower/BorrowerReducer";
import PdfKontrakPinjaman from "../../components/organism/pdfKontrakPinjaman/PdfKontrakPinjaman";
import { getProfileBorrower } from "../../service/Borrower/profile";
import { postBorrowersLoan } from "../../service/Borrower/borrower";

const PreviewKontrakPeminjaman = () => {
  const { state } = useLocation();
  const { accessToken } = useSelector((state) => state.auth);
  const { success, message } = useSelector((state) => state.borrower);
  const { profile } = useSelector((state) => state.borrower);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfileBorrower({ accessToken }));
  }, []);

  const handleOnClick = () => {
    dispatch(
      postBorrowersLoan({
        accessToken,
        data: state,
        navigate: () => navigate("/borrower"),
      })
    );
  };

  console.log(success);

  const handleCancel = () => {
    navigate("/borrower/pengajuan-pinjaman");
  };

  return (
    <>
      <Message
        status={success}
        message={message}
        visible={message !== null ? true : false}
        onClose={() => dispatch(setMessage(null))}
      />
      <PdfKontrakPinjaman data={state} />
      <div className="flex justify-center items-center gap-8">
        <Button
          onClick={handleOnClick}
          type={"button"}
          className={`w-1/5 mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white
      `}
        >
          Ajukan Pinjaman
        </Button>
        <Button
          onClick={handleCancel}
          type={"button"}
          className={`w-1/5 mt-3 px-4 py-2 border border-red-500 hover:bg-red-500 text-red-500 hover:text-white
      `}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default PreviewKontrakPeminjaman;
