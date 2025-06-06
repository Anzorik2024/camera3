import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendOrderAction, sendCouponAction } from '../thunks/product-process/product-process';

import { Camera, Cameras, SeveralCameras } from '../../types/camera';
import { CouponResponse } from '../../types/order';
import { RequestStatus } from '../../const/request-status';
import { FetchStatus } from '../../const/fetch-status';


type InitialState = {
  camerasInBasket: Cameras;
  selectedCamera: Camera | null;
  status: RequestStatus;
  orderSendingStatus: FetchStatus;
  coupon: string;
  couponSendingStatus: FetchStatus;
  discountCoupon: CouponResponse;
};

const initialState : InitialState = {
  camerasInBasket: [],
  selectedCamera: null,
  status: RequestStatus.Idle,
  orderSendingStatus: FetchStatus.Default,
  coupon: '',
  couponSendingStatus: FetchStatus.Default,
  discountCoupon: null
};

const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    downloadCameraToBasket:(state, action: PayloadAction<Cameras>) =>{
      state.camerasInBasket = action.payload;
    },
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
    },
    addCoupon: (state, action: PayloadAction<string>) => {
      state.coupon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrderAction.pending, (state) => {
      state.orderSendingStatus = FetchStatus.Loading;
    });
    builder.addCase(sendOrderAction.fulfilled, (state) => {
      state.orderSendingStatus = FetchStatus.Success;
      state.camerasInBasket = [];
    });
    builder.addCase(sendOrderAction.rejected, (state) => {
      state.orderSendingStatus = FetchStatus.Error;
    });
    builder.addCase(sendCouponAction.fulfilled, (state, action) => {
      state.discountCoupon = action.payload;
      state.couponSendingStatus = FetchStatus.Success;
    });
    builder.addCase(sendCouponAction.pending, (state) => {
      state.couponSendingStatus = FetchStatus.Loading;
    });
    builder.addCase(sendCouponAction.rejected, (state) => {
      state.couponSendingStatus = FetchStatus.Error;
    });
  }

});


const orderReducer = orderSlice.reducer;
const {downloadCameraToBasket, addSameCamerasToBasket, selectCamera, resetOrder, addCameraToBasket,
  removeSameCamerasFromBasket, removeCameraFromBasket, addCoupon } = orderSlice.actions;

export {downloadCameraToBasket,addSameCamerasToBasket, removeCameraFromBasket, orderReducer,
  selectCamera, resetOrder, initialState, addCameraToBasket, removeSameCamerasFromBasket, addCoupon};
