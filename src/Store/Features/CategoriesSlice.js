import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// read all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (args, { rejectWithValue }) => {
    try {
      const result = await axios.get("/api/categories");
      if (result.status === 200) {
        return result.data.categories;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categoriesDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.categories = [];
      });
  },
});

export default categoriesSlice.reducer;
