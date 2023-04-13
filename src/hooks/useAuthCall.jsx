import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (userInfo) => {
    const BASE_URL = "http://10001.fullstack.clarusway.com/";

    dispatch(fetchStart());

    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/stock");
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login can not be performed");
      console.log(error);
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout performed");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
      console.log(error);
    }
  };
  const register = async (userInfo) => {
    const BASE_URL = "http://10001.fullstack.clarusway.com/";

    dispatch(fetchStart());

    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register performed");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Register can not be performed");
      console.log(error);
    }
  };
  return { login, logout, register };
};

export default useAuthCall;
