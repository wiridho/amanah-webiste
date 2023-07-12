import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputLabel, SelectDropdown } from "../../../components/molekul";
import { Button } from "../../../components/atom";
import {
  postBalanceAccountBank,
  getBalanceBanks,
} from "../../../service/balance/balance";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";

const AddBankBorrower = () => {
  const [banks, setBanks] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calling useForm
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  let to = "/borrower/list-bank";

  const onSubmit = (params) => {
    const { accountNumber, selectedOption } = params;
    const data = {
      accountNumber,
      bankName: selectedOption.label,
      bankCode: selectedOption.value,
    };
    dispatch(
      postBalanceAccountBank({
        accessToken,
        data,
        navigate,
        to,
      })
    );
  };

  const getBank = async () => {
    const allBanks = await getBalanceBanks({ accessToken });
    setBanks(allBanks);
  };

  useEffect(() => {
    (async () => {
      await getBank();
    })();
  }, []);

  return (
    <div>
      <div className="h-screen flex justify-center items-center font-nunito-sans">
        {banks ? (
          <div className="max-w-sm w-full rounded-md shadow bg-white">
            <div className="p-5">
              <div className="text-lg mb-2 text-center font-semibold">
                Tambah Akun Bank
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col  gap-4 justify-center">
                  <div className="flex flex-col gap-3">
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
                      // caption="Pilih Bank"
                      data={banks}
                      control={control}
                      name="selectedOption"
                      errors={errors.selectedOption}
                    />
                  </div>
                  <Button
                    className={`bg-indigo-500 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md text-sm`}
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
    </div>
  );
};

export default AddBankBorrower;
