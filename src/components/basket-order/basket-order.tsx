import { formatPrice } from '../../utils/format';

type BasketOrderProps = {
  discountPrice: number;
  totalPrice: number;
  isBasketEmpty: boolean;
  onOrderButtonClick: () => void;
}

function BasketOrder({ totalPrice, isBasketEmpty, discountPrice, onOrderButtonClick}: BasketOrderProps): JSX.Element {

  const handleOrderButtonClick = () => {
    onOrderButtonClick();
  };
  return(
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{formatPrice(totalPrice)} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className="basket__summary-value basket__summary-value--bonus">{formatPrice(discountPrice)} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">111 390 ₽</span>
      </p>
      <button
        className="btn btn--purple"
        type="submit"
        disabled={isBasketEmpty}
        onClick={handleOrderButtonClick}
      >
          Оформить заказ
      </button>
    </div>
  );
}

export default BasketOrder;
