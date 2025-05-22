
type BasketSummaryProps = {
  onModalInfoOpen: () => void;
};
function BasketSummary ({ onModalInfoOpen }: BasketSummaryProps): JSX.Element {

  const handleOrderButtonClick = () => {

    onModalInfoOpen();
  };
  return(
    <div className="basket__summary">
      <div className="basket__promo">
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
        <button className="btn btn--purple" type="submit" onClick={handleOrderButtonClick}>Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default BasketSummary;
