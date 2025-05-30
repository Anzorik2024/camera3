import { useRef, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { removeSameCamerasFromBasket } from '../../store/order-slice/order-slice';
import { AppRoute } from '../../const/app-route';
import useElementFocus from '../../hooks/use-element-focus';
import useTrapFocus from '../../hooks/use-trap-focus';


type RemoveItemButtonsProps = {
  cameraId: number;
  onCloseModal: () => void;
  isOpen: boolean;
  buttonCloseRef: RefObject<HTMLButtonElement>;
}

const RemoveItemButtons = ({cameraId, onCloseModal, isOpen, buttonCloseRef}:RemoveItemButtonsProps):JSX.Element => {
  const dispatch = useAppDispatch();
  const buttonRemoveRef = useRef<HTMLButtonElement>(null);

  const handleRemoveItemButtonClick = () => {
    dispatch(removeSameCamerasFromBasket(cameraId));
    onCloseModal();
  };

  useElementFocus(isOpen,buttonRemoveRef);
  useTrapFocus(buttonRemoveRef, buttonCloseRef,isOpen);

  return (
    <>
      <button
        className="btn btn--purple modal__btn modal__btn--half-width"
        type="button"
        onClick={handleRemoveItemButtonClick}
        ref={buttonRemoveRef}
      >
        Удалить
      </button>
      <Link
        className="btn btn--transparent modal__btn modal__btn--half-width"
        onClick={onCloseModal}
        to={AppRoute.Main}
      >
        Продолжить покупки
      </Link>
    </>);
};
export default RemoveItemButtons;
