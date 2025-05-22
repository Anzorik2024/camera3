import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

function BreadCrumbsItemsCard (): JSX.Element {
  return (
    <>
      <li className="breadcrumbs__item">
        <Link className="breadcrumbs__link" to={AppRoute.Main}>Каталог
          <svg width="5" height="8" aria-hidden="true">
            <use xlinkHref="#icon-arrow-mini"></use>
          </svg>
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
      </li>
    </>
  );
}

export default BreadCrumbsItemsCard;
