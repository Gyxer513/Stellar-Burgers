/* cSpell:disable; */
import { api } from "../../utils/Api";
import { randomId } from "../../utils/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk("getData", async () => {
  const res = api.getData();
  return res;
});

export const ingredientsReducer = createSlice({
  name: "reducerIngredients",
  initialState: {
    ingredients: [],
    chosenIngredients: [],
    chosenBun: null,
    ingredientsRequest: false,
    ingredientsFailed: false,
    selectIngredient: {},
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
    selectIngredientData: (state, action) => {
      state.selectIngredient = action.payload;
    },

    clearSelectedIngregientsStore: (state) => {
      state.chosenIngredients = [];
      state.chosenBun = null;
    },

    deleteSelectedIngredientData: {
      reducer: (state) => {
        state.selectIngredient = {};
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
    [getData.rejected]: (state) => {
      state.ingredientsFailed = true;
    },
  },
});
export const {
  addIngredient,
  addBun,
  deleteIngredient,
  sortIngredients,
  selectIngredientData,
  deleteSelectedIngredientData,
  deleteCousenBun,
  clearSelectedIngregientsStore,
} = ingredientsReducer.actions;
export default ingredientsReducer.reducer;
