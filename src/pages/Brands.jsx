import Button from "@mui/material/Button";
import { Typography, Box, Grid, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/modals/BrandModal";
import { flexCenter } from "../styles/globalStyles";

const Brands = () => {
  const { getStockData } = useStockCall();
  const { brands, loading } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    image: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getStockData("brands");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(brands);
  return (
    <Box>
      <Typography variant="h4" color="error" mb={2}>
        Brands
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          handleOpen();
        }}
      >
        New Brand
      </Button>

      <BrandModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
        handleClose={handleClose}
      />

      {!loading && !brands?.length && (
        <Alert severity="warning" sx={{ mt: 4, width: "50%" }}>
          There is no brand to show
        </Alert>
      )}

      {brands?.length > 0 && (
        <Grid container sx={flexCenter} mt={4}>
          {brands?.map((brand) => (
            <Grid item key={brand.id}>
              <BrandCard brand={brand} setOpen={setOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Brands;
