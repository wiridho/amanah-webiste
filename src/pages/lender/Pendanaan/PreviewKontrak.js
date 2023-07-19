import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/atom/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { postLenderFunding } from "../../../service/lender/funding";

const PreviewKontrak = () => {
  const { state } = useLocation();
  const { url, data } = state;
  const { accessToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(
      postLenderFunding({
        data,
        accessToken,
        navigate: () => navigate("/funder"),
      })
    );
  };

  const handleCancel = () => {
    navigate("/funder/konfirmasi-pencairan");
  };

  return (
    <>
      <iframe src={url} type="application/pdf" width={"100%"} height={"90%"} />
      <div className="flex gap-3">
        <Button
          onClick={onClick}
          className={`mt-2 w-1/6 bg-indigo-500 hover:bg-indigo-700 px-5 py-2.5 text-white font-semibold `}
        >
          Setuju
        </Button>
        <Button
          type={"button"}
          onClick={handleCancel}
          className={`mt-2 w-1/6 bg-transparent border border-red-500 hover:bg-red-500 hover:text-white px-5 py-2.5 text-red-400 font-semibold `}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default PreviewKontrak;
