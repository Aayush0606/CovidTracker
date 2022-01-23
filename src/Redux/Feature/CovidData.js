import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "https://data.covid19india.org/v4/data.json";

const initialState = {
  value: {},
  status: null,
};

export const getMyData = createAsyncThunk("data/getMyData", async () => {
  const data = await fetch(url)
    .then((res) => res.json())
    .then((data) => data);
  return data;
});

export const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: {
    [getMyData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getMyData.fulfilled]: (state, { payload }) => {
      state.value = payload;
      state.status = "success";
    },
    [getMyData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default dataSlice.reducer;
