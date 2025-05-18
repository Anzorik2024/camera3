import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendOrderAction } from '../thunks/product-process/product-process';

import { Camera, Cameras } from '../../types/camera';
import { RequestStatus } from '../../const/request-status';


type InitialState = {
  camerasInBasket: Cameras;
  selectedCamera: Camera | null;
  status: RequestStatus;
};

const initialState : InitialState = {
  camerasInBasket: [],
  selectedCamera: null,
  status: RequestStatus.Idle
};

const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    addCameraToBasket: (state, action: PayloadAction<Camera>) => {
      const selectedCamera = action.payload;
      state.camerasInBasket = [...state.camerasInBasket, selectedCamera].slice().sort((itemA, itemB) => itemA.id - itemB.id);
    },
    selectCamera: (state, action: PayloadAction<Camera|null>) => {
      state.selectedCamera = action.payload;
    },
    resetOrder: (state) => {
      state.selectedCamera = null;
      state.status = RequestStatus.Idle;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrderAction.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(sendOrderAction.fulfilled, (state) => {
      state.status = RequestStatus.Success;
    });
    builder.addCase(sendOrderAction.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  }

});


const orderReducer = orderSlice.reducer;
const {selectCamera, resetOrder } = orderSlice.actions;

const orderSliceAction = {
  sendOrderAction
};

export { orderReducer, selectCamera, orderSliceAction, resetOrder, initialState};
