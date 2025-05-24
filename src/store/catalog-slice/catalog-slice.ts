import { createSlice } from '@reduxjs/toolkit';

import { fetchAllCameraAction, fetchPromoAction} from '../thunks/catalog-process/catalog-process';
import { Cameras, Promo } from '../../types/camera';


 type InitialState = {
  cameras: Cameras | [];
  isLoading: boolean;
  promo: Promo[];
};

const initialState : InitialState = {
  cameras: [],
  isLoading: false,
  promo:[]
};


const catalogSlice = createSlice({
  name: 'Catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCameraAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCameraAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCameraAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  },
});

const catalogReducer = catalogSlice.reducer;

const catalogReducerAction = {
  fetchAllCameraAction,
  fetchPromoAction
};

export { catalogReducer, catalogReducerAction, initialState };
