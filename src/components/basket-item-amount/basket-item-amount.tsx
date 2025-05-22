import { ChangeEvent } from 'react';

import { Camera } from '../../types/camera';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { addCameraToBasket } from '../../store/order-slice/order-slice';

import { ProductAmount } from '../../const/const';
import { removeCameraFromBasket } from '../../store/order-slice/order-slice';

type BasketQuantityProps = {
  onCameraAmountChange: (quantity: number|string) => void;
  camera: Camera;
  camerasAmount: number|string;
}

function BasketItemAmount ({onCameraAmountChange, camera, camerasAmount}: BasketQuantityProps):JSX.Element {

  const isAmountMinimum = Number(camerasAmount) === ProductAmount.Min; // минимальное значение
  const isAmountMaximum = Number(camerasAmount) === ProductAmount.Max; // максимальное значение товара

  const dispatch = useAppDispatch();

  const addExtraCameraToBasket = () => {
    dispatch(addCameraToBasket(camera)); // добавление товоара по плюс
  };

  const handleCameraAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => { // обработчик получение количества товара из полоя
    const currentProductAmount = Number(event.target.value);

    if (currentProductAmount === 0) {
      onCameraAmountChange('');

      return;
    }

    onCameraAmountChange(currentProductAmount);
  };

  const handleCameraDecreaseAmountButton = () => {
    onCameraAmountChange(Number(camerasAmount) - 1);

    dispatch(removeCameraFromBasket(camera.id));
  };

  const handleCameraIncreaseAmountButton = () => {
    onCameraAmountChange(Number(camerasAmount) + 1);

    addExtraCameraToBasket();
  };

  return (
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        aria-label="уменьшить количество товара"
        disabled={isAmountMinimum}
        onClick={handleCameraDecreaseAmountButton}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter2"></label>
      <input
        type="number"
        id="counter2"
        value="1" min="1"
        max="99"
        aria-label="количество товара"
        onChange={handleCameraAmountInputChange}
      />
      <button
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
        disabled={isAmountMaximum}
        onClick={handleCameraIncreaseAmountButton}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export default BasketItemAmount;
