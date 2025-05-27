import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { removeSameCamerasFromBasket } from '../../store/order-slice/order-slice';
import { AppRoute } from '../../const/app-route';
import useElementFocus from '../../hooks/use-element-focus';


type RemoveItemButtonsProps = {
  cameraId: number;
  onCloseModal: () => void;
}

const RemoveItemButtons = ({cameraId, onCloseModal}:RemoveItemButtonsProps):JSX.Element => {
  const dispatch = useAppDispatch();
  const buttonRemoveRef = useRef<HTMLButtonElement>(null);

  const handleRemoveItemButtonClick = () => {
    dispatch(removeSameCamerasFromBasket(cameraId));
    onCloseModal();
  };

  useElementFocus(true,buttonRemoveRef);

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
