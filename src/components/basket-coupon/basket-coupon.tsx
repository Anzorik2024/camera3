import {FormEvent, ChangeEvent } from 'react';

import { CouponValidityStatus } from '../../const/coupon-validity-status';

type BasketCouponProps = {
  isBasketEmpty: boolean;
  onCouponFormSubmit: (event: FormEvent) => void;
  onCouponInputChange: (value: string) => void;
  coupon: string;
  couponValidityStatus: CouponValidityStatus;
}


function BasketCoupon({isBasketEmpty, onCouponFormSubmit, onCouponInputChange, coupon, couponValidityStatus} : BasketCouponProps):JSX.Element {

  const handleCouponInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCouponInputChange(event.target.value);
  };

  const isCouponNotExist = couponValidityStatus === CouponValidityStatus.NotValid;
  const isCouponValid = couponValidityStatus === CouponValidityStatus.Valid;
  const isCouponSendingWithError = couponValidityStatus === CouponValidityStatus.Error;

  const getInputValidityClass = () => {
    if (isCouponNotExist || isCouponSendingWithError) {
      return 'is-invalid';
    }
    if (isCouponValid) {
      return 'is-valid';
    }

    return '';
  };

  const inputValidityClass = getInputValidityClass();


  return (
    <div className="basket__promo">
      <p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#" onSubmit={onCouponFormSubmit}>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                type="text"
                name="promo"
                placeholder="Введите промокод"
                value={coupon}
                onChange={handleCouponInputChange}
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit" disabled={isBasketEmpty}>Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default BasketCoupon;
