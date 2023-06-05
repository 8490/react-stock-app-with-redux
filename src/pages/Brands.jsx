import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import FirmCard from "../components/FirmCard";
import { flex } from "../styles/globalStyles";
import FirmModal from "../components/modals/FirmModal";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/modals/BrandModal";

const Brands = () => {
  const { getStockData } = useStockCall();
  const { brands } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    image: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getStockData("brands");
  }, []);
  console.log(brands);
  return (
    <div>
      <Typography variant="h4" color="error" sx={{ mb: 2 }}>
        Brands
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleOpen}>
        New Brand
      </Button>

      <BrandModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container sx={flex}>
        {brands?.map((brand) => (
          <Grid item key={brand.id}>
            <BrandCard brand={brand} setOpen={setOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Brands;
