import { useState } from 'react';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils/format';
import BasketItemAmount from '../basket-item-amount/basket-item-amount';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInTheBasket } from '../../store/selectors';

type BasketItemProps = {
  camera: Camera;
  onRemoveCameraFromBasketButtonClick: (id: number) => void;
}

import { capitalizeFirstLetter } from '../../utils/format';

function BasketItem({ camera, onRemoveCameraFromBasketButtonClick } : BasketItemProps): JSX.Element {

  const { previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, type, vendorCode, category, level, price, id} = camera;

  const selectedCameras = useAppSelector(getCamerasInTheBasket);
  const sameCameras = selectedCameras.filter((item) => item.id === id);
  const sameCamerasAmount = sameCameras.length;

  const [camerasAmount, setCamerasAmount] = useState<number|string>(sameCamerasAmount);

  const totalPrice = formatPrice(Number(camerasAmount) * price);


  const handleProductAmountChange = (productAmount: number|string) => {
    setCamerasAmount(productAmount);
  };

  const handleRemoveCameraFromBasketButtonClick = () => {
    localStorage.clear();
    onRemoveCameraFromBasketButtonClick(camera.id);
  };


  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
          />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x} 2x`}
            width={140}
            height={120}
            alt={name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{`${capitalizeFirstLetter(category)} «${capitalizeFirstLetter(name)}»`}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item"> {type}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽</p>
      <BasketItemAmount camerasAmount={camerasAmount} camera={camera} onCameraAmountChange={handleProductAmountChange} />
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{totalPrice} ₽</div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleRemoveCameraFromBasketButtonClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default BasketItem;
