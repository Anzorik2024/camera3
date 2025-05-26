import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendOrderAction } from '../thunks/product-process/product-process';

import { Camera, Cameras, SeveralCameras } from '../../types/camera';
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
    removeCameraFromBasket: (state, action: PayloadAction<number>) => {
      const removedCameraIndex = state.camerasInBasket.findIndex((camera) => camera.id === action.payload);
      state.camerasInBasket = [...state.camerasInBasket.slice(0, removedCameraIndex), ...state.camerasInBasket.slice(removedCameraIndex + 1)];
    },
    removeSameCamerasFromBasket: (state, action: PayloadAction<number>) => {
      state.camerasInBasket = state.camerasInBasket.filter((camera) => camera.id !== action.payload);
    },
    addSameCamerasToBasket: (state, action: PayloadAction<SeveralCameras>) => {
      const {camera, camerasAmount} = action.payload;
      const newCameras = new Array(Number(camerasAmount)).fill(camera) as Cameras;

      const addedCameraFirstIndex = state.camerasInBasket.findIndex((item) => item.id === camera.id);
      const sameCamerasInBasketAmount = state.camerasInBasket.filter((item) => item.id === camera.id).length;
      const addedCameraLastIndex = addedCameraFirstIndex + sameCamerasInBasketAmount - 1;

      state.camerasInBasket = [...state.camerasInBasket.slice(0, addedCameraFirstIndex), ...newCameras, ...state.camerasInBasket.slice(addedCameraLastIndex + 1)];
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
      state.camerasInBasket = [];
    });
    builder.addCase(sendOrderAction.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  }

});


const orderReducer = orderSlice.reducer;
const {addSameCamerasToBasket, selectCamera, resetOrder, addCameraToBasket, removeSameCamerasFromBasket, removeCameraFromBasket} = orderSlice.actions;

const orderSliceAction = {
  sendOrderAction
};

export {addSameCamerasToBasket, removeCameraFromBasket, orderReducer, selectCamera, orderSliceAction, resetOrder, initialState, addCameraToBasket, removeSameCamerasFromBasket};
