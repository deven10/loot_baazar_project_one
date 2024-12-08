import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ReactToastify } from "../../utility/ReactToastify";

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

// read all Wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (token, { rejectWithValue }) => {
    try {
      const result = await axios.get("/api/user/wishlist", {
        headers: {
          authorization: `${token}`,
        },
      });

      if (result.status === 200) {
        return result.data.wishlist;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (data, { rejectWithValue }) => {
    try {
      if (!data.token) {
        return ReactToastify("Please Login first", "error");
      }

      const body = {
        product: data.product,
      };

      const result = await axios.post("/api/user/wishlist", body, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${data.token}`,
        },
      });
      if (result.status === 201) {
        ReactToastify("Product Added to Wishlist", "success");
        return result.data.wishlist;
      } else if (result.status === 500) {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (data, { rejectWithValue }) => {
    try {
      if (initialState.loading) return;
      const result = await axios.delete(
        `/api/user/wishlist/${data.productId}`,
        {
          headers: {
            authorization: `${data.token}`,
          },
        }
      );
      if (result.status === 200) {
        ReactToastify("Product Removed from Wishlist", "warn");
        return result.data.wishlist;
      } else if (result.status === 500) {
        ReactToastify("Please Login first", "error");
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlistDetails",
  initialState,
  reducers: {
    clearWishlist: (state, action) => {
      state.wishlist = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.wishlist = [];
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.wishlist = [];
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.wishlist = [];
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
