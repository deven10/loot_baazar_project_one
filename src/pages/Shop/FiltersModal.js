import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { categories } from "../../utility/utils";
import { Filters } from "./Filters";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  // bgcolor: "background.paper",
  // border: '2px solid #000',
  // boxShadow: 24,
  //   p: 4,
};

export const FiltersModal = ({
  open,
  setOpen,
  search,
  products,
  setProductsArray,
  category,
  setCategory,
}) => {
  const handleClose = () => setOpen(false);

  return (
    <div className="filters-modal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            className="custom-block block-border-radius px-5 py-4"
          >
            <Filters
              search={search}
              products={products}
              setProductsArray={setProductsArray}
              category={category}
              setCategory={setCategory}
            />
            <button
              onClick={handleClose}
              className="border-1 px-3 py-2 add-to-cart-link float-right"
            >
              Close
            </button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
