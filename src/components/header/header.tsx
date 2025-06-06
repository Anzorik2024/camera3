import { Link } from 'react-router-dom';
import SearchForm from '../search-form/search-form';
import BasketCounter from '../basket-counter/basket-counter';
function Header () : JSX.Element {
  return (
    <header className="header" id="header" data-testid="header">
      <div className="container">
        <Link className="header__logo" to="/" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to="/">Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <BasketCounter />
      </div>

    </header>
  );
}

export default Header;
