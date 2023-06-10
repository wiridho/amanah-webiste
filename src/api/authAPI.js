import { doPost, login } from "./baseAPI";
import { END_POINT } from "../constant/endpoint";

export const postLogin = async (request) =>
  await login({
    ...{ endpoint: END_POINT.AUTH.LOGIN },
    ...request,
  });
export const postVerification = async (request) =>
  await doPost({
    ...{
      endpoint: END_POINT.AUTH.VERIFICATION(request?.userId, request?.token),
    },
    ...request,
  });
