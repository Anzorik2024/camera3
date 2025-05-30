import { useRef, RefObject } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { AppRoute } from '../../const/app-route';
import useElementFocus from '../../hooks/use-element-focus';
import useTrapFocus from '../../hooks/use-trap-focus';


type GoToBasketButtonsProps = {
  onCloseModal: () => void;
  isOpen: boolean;
  buttonCloseRef: RefObject<HTMLButtonElement>;
}

const GoToBasketButtons = ({ onCloseModal, isOpen, buttonCloseRef}: GoToBasketButtonsProps):JSX.Element => {
  const navigate = useNavigate();

  const backToMainPageLinkRef = useRef<HTMLAnchorElement>(null);

  const handleCloseButtonClick = () => {
    onCloseModal();
  };

  const handleGoToBasketClick = () => {
    navigate(AppRoute.Basket);
    onCloseModal();
  };

  useTrapFocus(backToMainPageLinkRef, buttonCloseRef,isOpen);
  useElementFocus(isOpen,backToMainPageLinkRef);
  return (
    <>
      <Link
        className="btn btn--transparent modal__btn"
        onClick={handleCloseButtonClick}
        to={AppRoute.Main}
        ref={backToMainPageLinkRef}
      >
        Продолжить покупки
      </Link>

      <button
        className="btn btn--purple modal__btn modal__btn--fit-width"
        onClick={handleGoToBasketClick}
      >
          Перейти в корзину
      </button>
    </>);
};
export default GoToBasketButtons;
