import {FormEvent, ChangeEvent } from 'react';

type BasketCouponProps = {
  isBasketEmpty: boolean;
  onCouponFormSubmit: (event: FormEvent) => void;
  onCouponInputChange: (value: string) => void;
  coupon: string;
}


function BasketCoupon({isBasketEmpty, onCouponFormSubmit, onCouponInputChange, coupon} : BasketCouponProps):JSX.Element {

  const handleCouponInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCouponInputChange(event.target.value);
  };


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
