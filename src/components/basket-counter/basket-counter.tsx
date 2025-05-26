import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInTheBasket } from '../../store/selectors';


function BasketCounter():JSX.Element {

  const camerasInTheBasket = useAppSelector(getCamerasInTheBasket);
  const basketCount = camerasInTheBasket.length;

  return(
    <Link className="header__basket-link" to={AppRoute.Basket}>
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {basketCount > 0 && <span className="header__basket-count">{basketCount}</span>}
    </Link>
  );
}

export default BasketCounter;
