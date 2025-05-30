import BasketOrder from '../basket-order/basket-order';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInTheBasket } from '../../store/selectors';
import { selectPromo } from '../../store/selectors';
import { sendOrderAction } from '../../store/thunks/product-process/product-process';
import { toast } from 'react-toastify';
import { WarningMessage } from '../../const/warning-message';
import { CART_KEY } from '../../const/const';
import { calculateBaseDiscountPrice } from '../../utils/calculate-base-discount-price';

import { Camera } from '../../types/camera';


type BasketSummaryProps = {
  onModalInfoOpen: () => void;
};
function BasketSummary ({ onModalInfoOpen }: BasketSummaryProps): JSX.Element {

  const dispatch = useAppDispatch();

  const camerasInBasket = useAppSelector(getCamerasInTheBasket);
  const camerasIds = camerasInBasket.map((camera) => camera.id);

  const camerasPromo = useAppSelector(selectPromo);
  const camerasPromoIds: number[] = camerasPromo.map((item) => item.id);
  const camerasInBasketWithoutPromo = camerasInBasket.filter((item : Camera) => !camerasPromoIds.includes(item.id));

  const isBasketEmpty = camerasInBasket.length === 0;
  const camerasInBasketTotalPrice = camerasInBasket.reduce((acc: number, item: Camera) => acc + item.price, 0);
  const camerasWithoutPromoTotalPrice = camerasInBasketWithoutPromo.reduce((acc: number, item: Camera) => acc + item.price, 0);

  const camerasBaseDiscoutTotalPrice = calculateBaseDiscountPrice(camerasInBasketWithoutPromo.length, camerasWithoutPromoTotalPrice);

  const allDiscountTotalPrice = camerasWithoutPromoTotalPrice - camerasBaseDiscoutTotalPrice;

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
        discountPrice={allDiscountTotalPrice}
        totalPrice={camerasInBasketTotalPrice}
        isBasketEmpty={isBasketEmpty}
        onOrderButtonClick={handleOrderButtonClick}
      />
    </div>
  );
}

export default BasketSummary;
