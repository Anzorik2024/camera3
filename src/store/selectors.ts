import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state/state';
import { Reviews, ReviewsAdapt, Cameras } from '../types/camera';
import { CouponResponse } from '../types/order';

import { adaptReview } from '../utils/adapt-review';
import { sortReviewByTime } from '../utils/sort-compare';
import { FetchStatus } from '../const/fetch-status';


const selectCameras = (state: State) => state.catalog.cameras;
const selectPromo = (state: State) => state.catalog.promo;
const selectIsLoading = (state: State) => state.catalog.isLoading;
const selectProductCamera = (state: State) => state.product.camera;
const selectCameraReviews = (state: State) => state.product.reviews;
const selectProductStatus = (state: State) => state.product.status;
const selectOrderStatus = (state: State) => state.order.status;


const getSelectCamera = (state: State) => state.order.selectedCamera;

const selectAdaptedReviews = createSelector(selectCameraReviews, (reviews: Reviews) => reviews.map(adaptReview));
const selectSortedReviews = createSelector(selectAdaptedReviews, (reviews: ReviewsAdapt) => reviews.sort(sortReviewByTime));

const getCurrentSortType = (state: State) => state.sort.currentSortType;
const getCurrentSortOrder = (state: State) => state.sort.currentSortOrder;


const getCamerasMinPrice = (state: State): number => state.filter.minPrice;
const getCamerasMaxPrice = (state: State): number => state.filter.maxPrice;

const getUserEnteredBottomPrice = (state: State) => state.filter.bottomPrice;
const getUserEnteredTopPrice = (state: State) => state.filter.topPrice;

const getCurrentFilterByCategory = (state: State) => state.filter.currentFilterCategory;
const getCurrentFiltersByTypes = (state: State) => state.filter.currentFilterTypes;
const getCurrentFiltersByLevels = (state: State) => state.filter.currentFilterLevels;

const getCamerasInTheBasket = (state: State): Cameras => state.order.camerasInBasket;
const getOrderSendingStatus = (state: State): FetchStatus => state.order.orderSendingStatus;
const getCouponSendingStatus = (state: State): FetchStatus => state.order.couponSendingStatus;
const getCoupon = (state: State): string => state.order.coupon;
const getDiscountCoupon = (state: State): CouponResponse => state.order.discountCoupon;


export {
  selectCameras,selectIsLoading,selectProductStatus,selectProductCamera,selectCameraReviews,selectSortedReviews,
  getSelectCamera,selectOrderStatus,getCurrentSortType,getCurrentSortOrder,getCamerasMinPrice,
  getCamerasMaxPrice,getUserEnteredBottomPrice,getUserEnteredTopPrice,getCurrentFilterByCategory,getCurrentFiltersByTypes,
  getCurrentFiltersByLevels,getCamerasInTheBasket,selectPromo, getOrderSendingStatus, getCoupon, getDiscountCoupon,
  getCouponSendingStatus
};
