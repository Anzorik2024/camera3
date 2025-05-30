import { useRef, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import useElementFocus from '../../hooks/use-element-focus';
import useTrapFocus from '../../hooks/use-trap-focus';

type ReturnToCatalogButtonProps = {
  onCloseModal: () => void;
  isOpen: boolean;
   buttonCloseRef: RefObject<HTMLButtonElement>;
}
const ReturnToCatalogButton = ({ onCloseModal, isOpen,buttonCloseRef}:ReturnToCatalogButtonProps):JSX.Element => {
  const navigate = useNavigate();
  const buttonReturnRef = useRef<HTMLButtonElement>(null);


  const handleButtonReturnToCatalogClick = () => {
    navigate(AppRoute.Main);
    onCloseModal();
  };

  useTrapFocus(buttonReturnRef, buttonCloseRef,isOpen);
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
