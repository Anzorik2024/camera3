type BasketQuantityProps = {
  onCameraAmountChange: (quantity: number|string) => void;
  camera: Camera;
  camerasAmount: number|string;
}

function BasketItemAmount ({onCameraAmountChange, camera, camerasAmount}: BasketQuantityProps):JSX.Element {
  return (
    <div className="quantity">
      <button className="btn-icon btn-icon--prev" disabled aria-label="уменьшить количество товара">
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter2"></label>
      <input type="number" id="counter2" value="1" min="1" max="99" aria-label="количество товара"/>
      <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export default BasketItemAmount;
