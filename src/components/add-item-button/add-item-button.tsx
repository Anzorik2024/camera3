import { useRef } from 'react';

import { Camera } from '../../types/camera';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { addCameraToBasket } from '../../store/order-slice/order-slice';
import useElementFocus from '../../hooks/use-input-focus';

type AddItemButtonProps = {
  camera: Camera;
  onCloseModal: () => void;
  onOpenSuccessModal: () => void;
}
const AddItemButton = ({camera, onCloseModal, onOpenSuccessModal}:AddItemButtonProps):JSX.Element => {
  const dispatch = useAppDispatch();

  const addButtonRef = useRef<HTMLButtonElement>(null);// переделать для параграфа

  useElementFocus(true,addButtonRef);

  const handleButtonAddToBasketClick = () => {
    dispatch(addCameraToBasket(camera));
    onCloseModal();
    onOpenSuccessModal();
  };

  return (
    <button
      className="btn btn--purple modal__btn modal__btn--fit-width"
      type="button"
      onClick={handleButtonAddToBasketClick}
      ref={addButtonRef}
    >
      <svg width="24" height="16" aria-hidden="true">
        <use xlinkHref="#icon-add-basket"></use>
      </svg>
      Добавить в корзину
    </button>);
};
export default AddItemButton;
