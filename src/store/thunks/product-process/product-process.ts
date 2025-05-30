import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';

import { ApiRoute } from '../../../const/api-route';
import { Camera} from '../../../types/camera';
import { Reviews } from '../../../types/camera';
import { Order, Coupon, CouponResponse } from '../../../types/order';
import { NOT_FOUND_ERROR_STATUS } from '../../../const/const';


export const fetchCameraByIdAction = createAsyncThunk<
Camera,
string,
{
  extra: AxiosInstance;
}
>('product/fetchCameraById',
  async (id, { extra: api}) => {
    const { data } = await api.get<Camera>(`${ApiRoute.Cameras}/${id}`);

    return data;
  }
);

export const fetchCameraReviews = createAsyncThunk<
Reviews,
string,
{
  extra: AxiosInstance;
}
>('product/fetchCameraReviews',
  async (id, { extra: api}) => {
    const { data } = await api.get<Reviews>(`${ApiRoute.Cameras}/${id}/reviews`);

    return data;
  }
);

export const sendOrderAction = createAsyncThunk<
void,
Order,
{
  extra: AxiosInstance;
}
>('order/sendOrder',
  async (userOrder, {extra: api}) => {
    await api.post<Order>(ApiRoute.Order, userOrder);
  }
);

export const sendCouponAction = createAsyncThunk<
CouponResponse,
Coupon,
{
 extra: AxiosInstance;
}
>('order/sendCoupon',
  async (coupon, {extra: api}) => {
    try {
      const response = await api.post<CouponResponse>(ApiRoute.Discount, coupon);
      return response.data;
    } catch (error) {
      const status = (error as AxiosError)?.response?.status;

      if (status === NOT_FOUND_ERROR_STATUS) {
        return null;
      }
      throw new Error();
    }
  }
);
