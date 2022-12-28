/* cSpell:disable; */
import { api } from "../../utils/Api";
import { randomId } from "../../utils/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk("getData", async () => {
  return api.getData();
});

export const ingredientsReducer = createSlice({
  name: "reducerIngredients",
  initialState: {
    ingredients: [],
    chosenIngredients: [],
    chosenBun: null,
    ingredientsRequest: false,
    ingredientsFailed: false,
  },
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        state.chosenIngredients.push(action.payload);
      },
      prepare: (targetIngredient) => {
        const newArray = Object.assign(
          { randomId: randomId() },
          targetIngredient
        );
        return { payload: newArray };
      },
    },
    addBun: {
      reducer: (state, action) => {
        state.chosenBun = action.payload;
      },
      prepare: (addedBun) => {
        const newBan = Object.assign({ randomId: randomId() }, addedBun);
        return { payload: newBan };
      },
    },
    deleteIngredient: (state, action) => {
      state.chosenIngredients = action.payload;
    },
    sortIngredients: (state, action) => {
      state.chosenIngredients = action.payload;
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.ingredientsRequest = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.ingredients = action.payload.data;
      state.ingredientsRequest = false;
    },
    [getData.rejected]: (state, action) => {
      state.ingredientsFailed = true;
      console.warn(action.error);
    },
  },
});
export const {
  addIngredient,
  addBun,
  deleteIngredient,
  sortIngredients,
  selectIngredientData,
} = ingredientsReducer.actions;
export default ingredientsReducer.reducer;
