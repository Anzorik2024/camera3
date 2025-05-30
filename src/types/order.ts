export type Coupon = {
  coupon: null | string;
};


export type Order = Coupon & {
  camerasIds: number[];
};


export type CouponResponse = null | number;
