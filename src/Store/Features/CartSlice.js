import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ReactToastify } from "../../utility/ReactToastify";
import { BASE_URL } from "../../config";
import api from "../../utility/api";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

// read all cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.get(`${BASE_URL}/cart/${data.userId}`, {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      });
      if (result.status === 200) {
        return result.data.products;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      if (!data.token) {
        return ReactToastify("Please Login first", "error");
      }

      const body = {
        productId: data.productId,
        quantity: data.quantity,
        userId: data.userId,
      };

      const result = await axios.post(`${BASE_URL}/cart`, body, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
      });

      if (result.status === 200) {
        ReactToastify("Product Added to Cart", "success");
        return result.data.cart.products || [];
      } else if (result.status === 500) {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (data, { rejectWithValue }) => {
    try {
      if (initialState.loading) return;
      const result = await axios.post(`${BASE_URL}/cart/remove`, data.body, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
      });

      if (result.status === 200) {
        ReactToastify("Product Removed from Cart", "success");
        return result?.data?.cart?.products || [];
      } else if (result.status === 500) {
        ReactToastify("Please Login first", "error");
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// update from cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (data, { rejectWithValue }) => {
    try {
      if (initialState.loading) return;

      const result = await axios.post(`${BASE_URL}/cart/update`, data.body, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
      });

      if (result.status === 201) {
        return result.data.cart.products || [];
      } else if (result.status === 500) {
        ReactToastify("Please Login first", "error");
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cartDetails",
  initialState,
  reducers: {
    clearCart: (state, action) => {
      state.cart = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cart = [];
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cart = [];
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cart = [];
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cart = [];
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
