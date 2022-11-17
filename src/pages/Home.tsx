import { memo, useMemo, useState } from "react";

import { useProducts } from "../hooks";

import { ProductCard } from "../components";
import { Backdrop, CircularProgress, Grid, Pagination } from "@mui/material";

function HomeMemoized() {
  const { response, refetchProducts, isFetching } = useProducts();

  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  const firstPageIndex = (page - 1) * 12;
  const lastPageIndex =
    response && response?.data.length < 10
      ? response?.data.length
      : firstPageIndex + 12;

  const currentProducts = useMemo(() => {
    return response?.data.slice(firstPageIndex, lastPageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, response]);

  const refetchAllProducts = () => {
    refetchProducts();
  };
  return (
    <>
      {isFetching ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : response?.data.length ? (
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          sx={{ minHeight: "calc(100vh - 96px)" }}
        >
          <Grid container spacing={2}>
            {currentProducts?.map(({ id, title, price, category, images }) => (
              <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  id={id}
                  title={title}
                  price={price}
                  category={category}
                  images={images}
                  refetchProducts={refetchAllProducts}
                />
              </Grid>
            ))}
          </Grid>
          {response.data.length / 12 > 1 && (
            <Grid container py={2} justifyContent="flex-end">
              <Pagination
                count={Math.ceil(response.data.length / 12)}
                page={page}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <div>Elements not found...</div>
      )}
    </>
  );
}
export const Home = memo(HomeMemoized);
