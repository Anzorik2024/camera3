import BasketOrder from "../basket-order/basket-order";
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
      <BasketOrder
        totalPrice={camerasInBasketTotalPrice}
        onOrderButtonClick={handleOrderButtonClick}
      />
    </div>
  );
}

export default BasketSummary;
