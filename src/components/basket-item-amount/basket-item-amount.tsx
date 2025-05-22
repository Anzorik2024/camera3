import { ChangeEvent, KeyboardEvent } from 'react';

import { Camera } from '../../types/camera';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { addCameraToBasket } from '../../store/order-slice/order-slice';

import { ProductAmount } from '../../const/const';
import { removeCameraFromBasket, addSameCamerasToBasket } from '../../store/order-slice/order-slice';
import {toast} from 'react-toastify';
import { WarningMessage } from '../../const/warning-message';

type BasketQuantityProps = {
  onCameraAmountChange: (quantity: number|string) => void;
  camera: Camera;
  camerasAmount: number|string;
}

function BasketItemAmount ({onCameraAmountChange, camera, camerasAmount}: BasketQuantityProps):JSX.Element {

  const isAmountMinimum = Number(camerasAmount) === ProductAmount.Min;
  const isAmountMaximum = Number(camerasAmount) === ProductAmount.Max;

  const dispatch = useAppDispatch();

  const addExtraCameraToBasket = () => {
    dispatch(addCameraToBasket(camera));
  };

  const handleCameraAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleCameraAmountInputBlur = () => {
    if (Number(camerasAmount) < ProductAmount.Min) {
      toast.error(WarningMessage.ProductsAmountLessThanMinimum);
      onCameraAmountChange(ProductAmount.Min);

      addExtraCameraToBasket();

      return;
    }
    if (Number(camerasAmount) > ProductAmount.Max) {
      toast.error(WarningMessage.ProductsAmountMoreThanMaximum);
      onCameraAmountChange(ProductAmount.Max);

      dispatch(addSameCamerasToBasket({camera, camerasAmount: ProductAmount.Max}));

      return;
    }

    dispatch(addSameCamerasToBasket({camera, camerasAmount}));
  };

  const handlePriceInputBlur = (event: KeyboardEvent) => {
    const inputElement = event.target as HTMLInputElement;
    if (event.key === 'Enter') {
      inputElement.blur();
    }
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
        value={camerasAmount}
        aria-label="количество товара"
        onChange={handleCameraAmountInputChange}
        onBlur={handleCameraAmountInputBlur}
        onKeyDown={handlePriceInputBlur}
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
