/* cSpell:disable; */
import { api } from "../../utils/Api";
import { randomId } from "../../utils/data";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IingredientsStore } from "../types/store"
import { Iingredient } from "../types/ingredients";


export const getData = createAsyncThunk("getData", async () => {
  return api.getData();
});

const initialState: IingredientsStore = {
  ingredients: [],
  chosenIngredients: [],
  chosenBun: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
}

export const ingredientsReducer = createSlice({
  name: "reducerIngredients",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<never[]>) => {
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
      reducer: (state, action: PayloadAction<Iingredient>) => {
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
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.ingredientsRequest = true;
    }),
    builder.addCase(getData.fulfilled, (state, action) => {
      state.ingredients = action.payload.data;
      state.ingredientsRequest = false;
    }),
    builder.addCase(getData.rejected, (state, action) => {
      state.ingredientsFailed = true;
      console.warn(action.error);
    })
  },
});
export const {
  addIngredient,
  addBun,
  deleteIngredient,
  sortIngredients,
} = ingredientsReducer.actions;
export default ingredientsReducer.reducer;
