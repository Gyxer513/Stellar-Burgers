import {api} from "../../utils/Api";
import { randomId } from "../../utils/data";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
  chosenIngredients: [],
  chosenBun: null,
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const getData = createAsyncThunk(
  'getData',
  async () => {
      const res = api.getData();
      return res
  })

  export const ingredientsReducer = createSlice({
    name: 'reducerIngredients',
    initialState: initialState,
    reducers: {
      addItem: {
        reducer: (state, action) => {
            state.chosenIngredients.push(action.payload);
            state.priceState = state.priceState + action.payload.price;
        },
        prepare: addedIngredients => {
          const newArray = addedIngredients.map((ingredientObject) => {
            return Object.assign(  {randomId: randomId()}, ingredientObject);
          });
            return { payload: newArray }
        }
    },
    },
    extraReducers: {
        [getData.pending]: (state) => {
            state.ingredientsRequest = true
        },
        [getData.fulfilled]: (state, action) => {
            state.ingredients = action.payload.data;
            state.ingredientsRequest = false
        },
        [getData.rejected]: (state) => {
            state.ingredientsFailed= true
        }
    }
})
export const {addItem} = ingredientsReducer.actions
export default ingredientsReducer.reducer;