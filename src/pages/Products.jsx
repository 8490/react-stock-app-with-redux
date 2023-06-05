import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { flex } from "../styles/globalStyles";
import ProductModal from "../components/modals/ProductModal";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { getStockData } = useStockCall();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getStockData("products");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(products);
  return (
    <div>
      <Typography variant="h4" color="error" sx={{ mb: 2 }}>
        Products
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleOpen}>
        New Product
      </Button>

      <ProductModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container sx={flex}>
        {products?.map((product) => (
          <Grid item key={product.id}>
            <ProductCard
              product={product}
              setOpen={setOpen}
              setInfo={setInfo}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
