import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBalanceTransactionHistory,
  getBalanceTransactionHistoryAddList,
} from "../../service/balance/balance";
import TableTransactionLender from "../../components/organism/tableTransactionLender/TableTransactionLender";
import {
  setTransactionHistory,
  setLoad,
} from "../../store/reducer/Balance/BalanceTransactionReducer";
import _ from "lodash";

const RiwayatTransaksi = () => {
  const [params, setParams] = useState({
    type: "",
    status: "",
    page: 1,
    limit: 10,
  });
  const { accessToken } = useSelector((state) => state.auth);
  const { load, transactionHistory } = useSelector(
    (state) => state.balance_transaction
  );
  const dispatch = useDispatch();

  const onSelect = (e) => {
    let value = {
      ...params,
      ...{ [e.target.name]: e.target.value, page: 1 },
    };
    setParams(value);
    getTransaction(value);
  };

  const getTransaction = (params) => {
    dispatch(getBalanceTransactionHistory({ accessToken, params }));
  };

  const onClick = () => {
    dispatch(setLoad(true));
    let param = {
      ...params,
      ...{ page: params.page + 1 },
    };
    setParams(param);
    setTimeout(async () => {
      let response = await getBalanceTransactionHistoryAddList({
        accessToken,
        param,
      });
      dispatch(
        setTransactionHistory(
          _.unionBy(transactionHistory, response, "transactionId")
        )
      );
      dispatch(setLoad(false));
    }, [500]);
  };

  useEffect(() => {
    getTransaction(params);
  }, []);

  return (
    <div className="font-nunito-sans bg-white p-5 rounded-md">
      <div>
        {load ? (
          "Loading"
        ) : (
          <TableTransactionLender
            list={transactionHistory}
            onSelect={(e) => onSelect(e)}
            onClick={() => onClick()}
            params={params}
          />
        )}
      </div>
    </div>
  );
};

export default RiwayatTransaksi;
