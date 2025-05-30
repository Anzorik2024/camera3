import {FormEvent, useState } from 'react';

import BasketOrder from '../basket-order/basket-order';
import BasketCoupon from '../basket-coupon/basket-coupon';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInTheBasket, getCoupon, selectPromo } from '../../store/selectors';
import { sendOrderAction } from '../../store/thunks/product-process/product-process';
import { toast } from 'react-toastify';
import { WarningMessage } from '../../const/warning-message';
import { CART_KEY } from '../../const/const';
import { calculateBaseDiscountPrice } from '../../utils/calculate-base-discount-price';
import { CouponValidityStatus } from '../../const/coupon-validity-status';

import { Camera } from '../../types/camera';


type BasketSummaryProps = {
  onModalInfoOpen: () => void;
};

function BasketSummary ({ onModalInfoOpen }: BasketSummaryProps): JSX.Element {

  const dispatch = useAppDispatch();
  const initialCoupon = useAppSelector(getCoupon);

  const camerasInBasket = useAppSelector(getCamerasInTheBasket);
  const camerasIds = camerasInBasket.map((camera) => camera.id);

  const camerasPromo = useAppSelector(selectPromo);
  const camerasPromoIds: number[] = camerasPromo.map((item) => item.id);
  const camerasInBasketWithoutPromo = camerasInBasket.filter((item : Camera) => !camerasPromoIds.includes(item.id));

  const isBasketEmpty = camerasInBasket.length === 0;
  const camerasInBasketTotalPrice = camerasInBasket.reduce((acc: number, item: Camera) => acc + item.price, 0);
  const camerasWithoutPromoTotalPrice = camerasInBasketWithoutPromo.reduce((acc: number, item: Camera) => acc + item.price, 0);

  const camerasBaseDiscoutTotalPrice = calculateBaseDiscountPrice(camerasInBasketWithoutPromo.length, camerasWithoutPromoTotalPrice);

  const allDiscountTotalPrice = camerasWithoutPromoTotalPrice - camerasBaseDiscoutTotalPrice;


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

    // const validCoupon = coupon.split(' ').join('');
    // dispatch(sendCouponAction({coupon: validCoupon}));
    // dispatch(addCoupon(coupon));
  };

  return(
    <div className="basket__summary">
      <BasketCoupon
        isBasketEmpty={isBasketEmpty}
        onCouponFormSubmit={handlePromoFormSubmit}
        onCouponInputChange={handleCouponInputChange}
        coupon={coupon}
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
