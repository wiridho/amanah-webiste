import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Component
import { InputLabel, SelectDropdown } from "../../../components/molekul";
import { Button, ErrorMessage } from "../../../components/atom";
// Service
import {
  getBalanceBanks,
  postBalanceAccountBank,
} from "../../../service/balance/balance";
import { setMessage } from "../../../store/reducer/Balance/BalanceAccountReducer";

const WithdrawTambahBank = () => {
  const [visible, setVisible] = useState(false);
  const { message } = useSelector((state) => state.balance_account);

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
            <div className="text-lg mb-2 text-center font-semibold">
              Tambah Akun Bank
            </div>
            <div className="my-2">
              {message && (
                <ErrorMessage
                  message={message}
                  visible={message !== null ? true : false}
                  onClose={() => dispatch(setMessage(null))}
                />
              )}
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
                    caption="Select an option"
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
  );
};

export default WithdrawTambahBank;
