import {FormEvent, useState, useEffect } from 'react';

import BasketOrder from '../basket-order/basket-order';
import BasketCoupon from '../basket-coupon/basket-coupon';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInTheBasket, getCoupon, selectPromo, getDiscountCoupon, getCouponSendingStatus } from '../../store/selectors';
import { sendOrderAction, sendCouponAction } from '../../store/thunks/product-process/product-process';
import { toast } from 'react-toastify';
import { WarningMessage } from '../../const/warning-message';
import { CART_KEY } from '../../const/const';
import { calculateBaseDiscountPrice } from '../../utils/calculate-base-discount-price';
import { CouponValidityStatus } from '../../const/coupon-validity-status';
import { addCoupon } from '../../store/order-slice/order-slice';
import { FetchStatus } from '../../const/fetch-status';

import { Camera } from '../../types/camera';


type BasketSummaryProps = {
  onModalInfoOpen: () => void;
};

function BasketSummary ({ onModalInfoOpen }: BasketSummaryProps): JSX.Element {

  const dispatch = useAppDispatch();
  const initialCoupon = useAppSelector(getCoupon);
  const discountCoupon = useAppSelector(getDiscountCoupon);
  const couponSendingStatus = useAppSelector(getCouponSendingStatus);

  const camerasInBasket = useAppSelector(getCamerasInTheBasket);
  const camerasIds = camerasInBasket.map((camera) => camera.id);

  const camerasPromo = useAppSelector(selectPromo);
  const camerasPromoIds: number[] = camerasPromo.map((item) => item.id);
  const camerasInBasketWithoutPromo = camerasInBasket.filter((item : Camera) => !camerasPromoIds.includes(item.id));

  const isBasketEmpty = camerasInBasket.length === 0;
  const camerasInBasketTotalPrice = camerasInBasket.reduce((acc: number, item: Camera) => acc + item.price, 0);
  const camerasWithoutPromoTotalPrice = camerasInBasketWithoutPromo.reduce((acc: number, item: Camera) => acc + item.price, 0);
  const discountCouponPrice = discountCoupon ? Math.ceil(camerasInBasketTotalPrice / 100 * discountCoupon) : 0;

  const camerasBaseDiscoutTotalPrice = calculateBaseDiscountPrice(camerasInBasketWithoutPromo.length, camerasWithoutPromoTotalPrice);

  const allDiscountTotalPrice = discountCoupon ? (camerasWithoutPromoTotalPrice - camerasBaseDiscoutTotalPrice) + (discountCouponPrice)
    : camerasWithoutPromoTotalPrice - camerasBaseDiscoutTotalPrice;


  const [couponValidityStatus, setCouponValidityStatus] = useState<CouponValidityStatus>(CouponValidityStatus.Default);
  const [coupon, setCoupon] = useState<string>(initialCoupon);

  const handleOrderButtonClick = () => {
    localStorage.clear();
    dispatch(sendOrderAction({coupon: null, camerasIds: camerasIds })).unwrap().then(
      () => {
        onModalInfoOpen();
      }).catch(() => {
      onModalInfoOpen();
      localStorage.setItem(CART_KEY, JSON.stringify(camerasInBasket));
      toast.error(WarningMessage.OrderError);
    });
  };

  const handleCouponInputChange = (value: string) => {
    if (value === '') {
      setCouponValidityStatus(CouponValidityStatus.Default);
    }
    setCoupon(value);
  };

  const handlePromoFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validCoupon = coupon.split(' ').join('');
    dispatch(sendCouponAction({coupon: validCoupon}));
    dispatch(addCoupon(coupon));
  };

  useEffect(() => {
    if (couponSendingStatus === FetchStatus.Success) {
      if (discountCoupon === null) {
        setCouponValidityStatus(CouponValidityStatus.NotValid);
      } else {
        setCouponValidityStatus(CouponValidityStatus.Valid);
      }
    }
    if (couponSendingStatus === FetchStatus.Error) {
      setCouponValidityStatus(CouponValidityStatus.Error);
      toast.error(WarningMessage.CouponSendError);
    }
  },[discountCoupon, couponSendingStatus]);

  return(
    <div className="basket__summary">
      <BasketCoupon
        isBasketEmpty={isBasketEmpty}
        onCouponFormSubmit={handlePromoFormSubmit}
        onCouponInputChange={handleCouponInputChange}
        coupon={coupon}
        couponValidityStatus={couponValidityStatus}
      />
      <BasketOrder
        discountPrice={allDiscountTotalPrice}
        totalPrice={camerasInBasketTotalPrice}
        isBasketEmpty={isBasketEmpty}
        onOrderButtonClick={handleOrderButtonClick}
      />
    </div>
  );
}

export default BasketSummary;
