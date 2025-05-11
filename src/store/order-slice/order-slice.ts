import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendOrderAction } from '../thunks/product-process/product-process';

import { Camera } from '../../types/camera';
import { RequestStatus } from '../../const/request-status';


type InitialState = {
  selectedCamera: Camera | null;
  status: RequestStatus;
};

const initialState : InitialState = {
  selectedCamera: null,
  status: RequestStatus.Idle
};

const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
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
