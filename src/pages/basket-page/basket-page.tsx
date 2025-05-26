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
import BasketModal from '../../components/basket-modal/basket-modal';
import BasketInfoModal from '../../components/basket-info-modal/basket-info-modal';
import { ModalType } from '../../const/modal-type';
import BasketSummary from '../../components/basket-summary/basket-summary';
import useDisableBackground from '../../hooks/use-disable-background';


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


  useDisableBackground(isModalRemoveCameraFromBasketOpen);
  useDisableBackground(isInfoModalOpen);

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
              <BasketSummary onModalInfoOpen={handleOpenInfoModal}/>
            </div>
          </section>
          {isModalRemoveCameraFromBasketOpen &&
          <div className='modal is-active'>
            <BasketModal
              onCloseModal={handleCloseRemoveCameraFromBasketModal}
              modalType={ModalType.RemoveCameraFromBasket}
              onOpenSuccessModal={handleOpenInfoModal}
            />
          </div>}
          {isInfoModalOpen &&
      <BasketInfoModal
        modalType={ModalType.CamerasOrdered}
        onCloseModal={handleCloseInfoModal}
      />}
        </div>

      </main>
      <Footer/>
    </div>

  );
}

export default BasketPage;
