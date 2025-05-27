import BasketOrder from '../basket-order/basket-order';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInTheBasket } from '../../store/selectors';
import { selectPromo } from '../../store/selectors';
import { sendOrderAction } from '../../store/thunks/product-process/product-process';
import { toast } from 'react-toastify';
import { WarningMessage } from '../../const/warning-message';
import { CART_KEY } from '../../const/const';

import { Camera } from '../../types/camera';


type BasketSummaryProps = {
  onModalInfoOpen: () => void;
};
function BasketSummary ({ onModalInfoOpen }: BasketSummaryProps): JSX.Element {

  const dispatch = useAppDispatch();

  const camerasInBasket = useAppSelector(getCamerasInTheBasket);
  const camerasIds = camerasInBasket.map((camera) => camera.id);

  const camerasPromo = useAppSelector(selectPromo);// получение промо камер
  const camerasPromoId: number[] = camerasPromo.map((item) => item.id);// получение промо  массива id камер
  const camerasInBasketWithoutPromo = camerasInBasket.filter((item : Camera) => !camerasPromoId.includes(item.id));

  const isBasketEmpty = camerasInBasket.length === 0;
  const camerasInBasketTotalPrice = camerasInBasket.reduce((acc: number, item: Camera) => acc + item.price, 0);
  const camerasInBasketWithoutPromoTotalPrice = camerasInBasketWithoutPromo.reduce((acc: number, item: Camera) => acc + item.price, 0);

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
  return(
    <div className="basket__summary">
      <div className="basket__promo">
      </div>
      <BasketOrder
        totalPrice={camerasInBasketTotalPrice}
        isBasketEmpty={isBasketEmpty}
        onOrderButtonClick={handleOrderButtonClick}
      />
    </div>
  );
}

export default BasketSummary;
