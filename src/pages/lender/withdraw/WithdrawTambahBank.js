import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { InputLabel, SelectDropdown } from "../../../components/molekul";
import { Button } from "../../../components/atom";
import {
  getBalanceBanks,
  postBalanceAccountBank,
} from "../../../service/balance/balance";
import { useNavigate } from "react-router-dom";

const WithdrawTambahBank = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [banks, setBanks] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  // Calling useForm
  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();

  const onSubmit = (params) => {
    const { accountNumber, selectedOption } = params;
    const data = {
      accountNumber,
      bankName: selectedOption.label,
      bankCode: selectedOption.value,
    };
    dispatch(postBalanceAccountBank({ accessToken, data, navigate }));
  };

  useEffect(() => {
    (async () => {
      await getBank();
    })();
  }, []);

  const getBank = async () => {
    const allBanks = await getBalanceBanks({ accessToken });
    setBanks(allBanks);
  };

  return (
    <div className="h-screen flex justify-center items-center font-nunito-sans">
      {banks ? (
        <div className="max-w-sm w-full rounded-md shadow bg-white">
          <div className="p-5">
            <div className="text-lg mb-1 text-center font-semibold">
              Tambah Akun Bank
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col  gap-4 justify-center">
                <div className="flex flex-col gap-1">
                  <InputLabel
                    placeholder={"1930xxxxx"}
                    name={"Nomor Rekening"}
                    type={"number"}
                    register={{
                      ...register("accountNumber", {
                        required: true,
                      }),
                    }}
                    errors={errors.accountNumber}
                  >
                    Nomor Rekening
                  </InputLabel>
                  <SelectDropdown
                    caption="Select an option"
                    data={banks}
                    control={control}
                    name="selectedOption"
                  />
                </div>
                <Button
                  className={`bg-indigo-500 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md text-xs`}
                  type={"submit"}
                >
                  Tambah Rekening
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default WithdrawTambahBank;
