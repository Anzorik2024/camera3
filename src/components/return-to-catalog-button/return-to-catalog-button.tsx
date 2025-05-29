import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import useElementFocus from '../../hooks/use-element-focus';

type ReturnToCatalogButtonProps = {
  onCloseModal: () => void;
  isOpen: boolean;
}
const ReturnToCatalogButton = ({ onCloseModal, isOpen }:ReturnToCatalogButtonProps):JSX.Element => {
  const navigate = useNavigate();
  const buttonReturnRef = useRef<HTMLButtonElement>(null);


  const handleButtonReturnToCatalogClick = () => {
    navigate(AppRoute.Main);
    onCloseModal();
  };

  useElementFocus(isOpen,buttonReturnRef);

  return (
    <button
      className="btn btn--purple modal__btn modal__btn--fit-width"
      type="button"
      onClick={handleButtonReturnToCatalogClick}
      ref={buttonReturnRef}
    >
          Вернуться к покупкам
    </button>);
};
export default ReturnToCatalogButton;
