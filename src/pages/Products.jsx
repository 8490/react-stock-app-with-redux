import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
// import { Grid } from "@mui/material";
// import { flex } from "../styles/globalStyles";
import ProductModal from "../components/modals/ProductModal";
// import ProductCard from "../components/ProductCard";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { btnStyle } from "../styles/globalStyles";

const Products = () => {
  const { getStockData, deleteStockData } = useStockCall();
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "#",
      width: 20,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      minwidth: 150,
      flex: 1,
    },
    {
      field: "brand",
      headerName: "Brand",
      headerAlign: "center",
      align: "center",
      minwidth: 150,

      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      minwidth: 150,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      headerAlign: "center",
      align: "center",
      minwidth: 100,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      minWidth: 50,
      flex: 1,
      renderCell: ({ id }) => (
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          sx={btnStyle}
          onClick={() => deleteStockData("products", id)}
        />
      ),
    },
  ];

  useEffect(() => {
    getStockData("products");
    getStockData("categories");
    getStockData("brands");
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

      <Box sx={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </div>
  );
};

export default Products;

{
  /* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">#</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product, index) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{product.category}</TableCell>
                <TableCell align="right">{product.brand}</TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="right">#</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */
}

{
  /* <Grid container sx={flex}>
        {products?.map((product) => (
          <Grid item key={product.id}>
            <ProductCard
              product={product}
              setOpen={setOpen}
              setInfo={setInfo}
            />
          </Grid>
        ))}
      </Grid> */
}
