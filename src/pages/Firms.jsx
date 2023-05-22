import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import FirmCard from "../components/FirmCard";
import { flex } from "../styles/globalStyles";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";

const Firms = () => {
  // const { token } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // const getFirms = async () => {
  //   const BASE_URL = "http://10001.fullstack.clarusway.com/";

  //   dispatch(fetchStart());
  //   const url = "firms";
  //   try {
  //     const { data } = await axios(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     // dispatch(getSuccess(data));
  //     dispatch(getSuccess({ data, url }));
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail());
  //   }
  // };
  const { getStockData } = useStockCall();
  const { firms } = useSelector((state) => state.stock);
  useEffect(() => {
    getStockData("firms");
  }, []);
  console.log(firms);
  return (
    <div>
      <Typography variant="h4" color="error">
        Firm
      </Typography>
      <Button variant="contained">New Firm</Button>
      <Grid container sx={flex}>
        {firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard firm={firm} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;
