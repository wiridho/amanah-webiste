import React, { useEffect, useState } from "react";
import { InputLabel, SelectBank } from "../../../components/molekul";
import { useForm } from "react-hook-form";
import { getBalanceBanks } from "../../../service/balance/balance";
import { useDispatch, useSelector } from "react-redux";
import { Button, Label } from "../../../components/atom";
import { postLoanDisbursement } from "../../../service/Borrower/borrower";
import { useNavigate } from "react-router-dom";

const FormPencairanPinjaman = () => {
  const [banks, setBanks] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);
  const { loanHistory } = useSelector((state) => state.borrower);
  const { loanId } = loanHistory?.active;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const getBank = async () => {
    const allBanks = await getBalanceBanks({ accessToken });
    setBanks(allBanks);
  };

  useEffect(() => {
    (async () => {
      await getBank();
    })();
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("loanId", loanId);
    formData.append("bankCode", data.selectedOption.value);
    formData.append("account", data.account);
    formData.append("productPageImage", data.productPageImage?.[0]);

    dispatch(
      postLoanDisbursement({
        accessToken,
        data: formData,
        navigate: () => navigate("/borrower/riwayat-pinjaman"),
      })
    );
    console.log(data);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-2/5 flex flex-col  bg-white border border-gray-200 shadow-sm rounded-xl ">
        <div className="p-4 md:p-6">
          <div>
            <span>Form Pengajuan</span>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SelectBank
                field={"Bank"}
                data={banks}
                control={control}
                name="selectedOption"
                errors={errors.selectedOption}
              >
                Pilih Bank
              </SelectBank>
              <InputLabel
                placeholder={"91090104039102"}
                type={"text"}
                name={"Account"}
                register={{
                  ...register("account", {
                    required: true,
                  }),
                }}
                errors={errors.account}
              >
                Nomor Rekening
              </InputLabel>
              <InputLabel
                name={"Halaman Bukti Pembayaran"}
                register={{
                  ...register("productPageImage", {
                    required: true,
                  }),
                }}
                type={"file"}
                className={
                  "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                }
                errors={errors?.productPageImage}
              >
                Halaman Bukti Pembayaran
              </InputLabel>
              <Button
                type={"submit"}
                className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white w-full mt-4`}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPencairanPinjaman;
