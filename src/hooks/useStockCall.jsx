import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import useAxios from "./useAxios";

const useStockCall = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  const deleteStockData = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  //   const getStockData = async (url) => {
  //     const BASE_URL = "http://10001.fullstack.clarusway.com/";

  //     dispatch(fetchStart());
  //     try {
  //       const { data } = await axios(`${BASE_URL}stock/${url}/`, {
  //         headers: { Authorization: `Token ${token}` },
  //       });
  //       // dispatch(getSuccess(data));
  //       dispatch(getSuccess({ data, url }));
  //     } catch (error) {
  //       console.log(error);
  //       dispatch(fetchFail());
  //     }
  //   };
  //   const deleteStockData = async (url, id) => {
  //     const BASE_URL = "http://10001.fullstack.clarusway.com/";

  //     dispatch(fetchStart());
  //     try {
  //       await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
  //         headers: { Authorization: `Token ${token}` },
  //       });
  //       getStockData(url);
  //     } catch (error) {
  //       console.log(error);
  //       dispatch(fetchFail());
  //     }
  //   };

  return { getStockData, deleteStockData };
};

export default useStockCall;
