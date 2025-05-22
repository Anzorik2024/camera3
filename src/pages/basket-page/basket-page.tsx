import { useState } from 'react';

import { useAppSelector } from '../../hooks/use-app-selector';
import { Cameras, Camera } from '../../types/camera';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import { getCamerasInTheBasket } from '../../store/selectors';

import BasketItem from '../../components/basket-item/basket-item';
import EmptyPage from '../empty-page/empty-page';
import { WarningMessage } from '../../const/warning-message';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { selectCamera } from '../../store/order-slice/order-slice';
import { removeCameraFromBasket } from '../../store/order-slice/order-slice';


function BasketPage() : JSX.Element {

  const cameras = useAppSelector(getCamerasInTheBasket);

  const uniqueCamerasInTheBasket = cameras.reduce(
    (acc: Cameras, item: Camera) =>
      acc.some((camera) => camera.id === item.id) ? acc : [...acc, item],
    []
  );

  const [isModalRemoveCameraFromBasketOpen, setModalRemoveCameraFromBasketOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleCloseRemoveCameraFromBasketModal = () => {
    setModalRemoveCameraFromBasketOpen(false);
    dispatch(selectCamera(null));
  };

  const handleRemoveCameraFromBasket = (cameraID: number) => {
    setModalRemoveCameraFromBasketOpen(true);

    const currentCamera = cameras.find((camera) => camera.id === cameraID);
    if (currentCamera) {
      dispatch(selectCamera(currentCamera));
    }
  };

  const handleOpenInfoModal = () => {
    setInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setInfoModalOpen(false);
  };


  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <BreadCrumbs isBasketPage/>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {uniqueCamerasInTheBasket.length > 0
                  ? uniqueCamerasInTheBasket.map((item) => (
                    <BasketItem
                      key={item.id}
                      camera={item}
                      onRemoveCameraFromBasketButtonClick={handleRemoveCameraFromBasket}
                    />
                  ))
                  : <EmptyPage message={WarningMessage.EmptyBasketMessage}/>}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>

  );
}

export default BasketPage;
