import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { SerializedError, current } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment, { months } from "moment";

type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const MessageResponse = error.data as MessageResponse;
    toast.error(MessageResponse.message);
  }
};

export const getLastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const last6Months: string[] = [];
  const last12Months: string[] = [];

  for (let i = 5; i>=0; i--) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMMM");
    last6Months.push(monthName);
  }

  for (let i =11; i >=0; i--) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMMM");
    last12Months.push(monthName);
  }

  return { last6Months, last12Months };
};
