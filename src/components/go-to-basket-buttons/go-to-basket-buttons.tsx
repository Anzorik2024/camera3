import { useNavigate, Link } from 'react-router-dom';

import { AppRoute } from '../../const/app-route';


type GoToBasketButtonsProps = {
  onCloseModal: () => void;
  // isOnProductPage?: boolean;
}

const GoToBasketButtons = ({ onCloseModal}: GoToBasketButtonsProps):JSX.Element => {
  const navigate = useNavigate();

  const handleCloseButtonClick = () => {
    // if (isOnProductPage) {
    //   navigate(`${AppRoute.Catalog}${MIN_PAGE_NUMBER}`);
    // }

    onCloseModal();
  };

  const handleGoToBasketClick = () => {
    navigate(AppRoute.Basket);
    onCloseModal();
  };

  return (
    <>
      <Link
        className="btn btn--transparent modal__btn"
        onClick={handleCloseButtonClick}
        to={AppRoute.Main}
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
