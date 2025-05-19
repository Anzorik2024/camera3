import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';
import Spiner from '../../components/spiner/spiner';
import { RequestStatus } from '../../const/request-status';
import { selectProductStatus, selectProductCamera} from '../../store/selectors';
import { useActionCreators } from '../../hooks/use-action-creators';
import { productDataActions } from '../../store/product-slice/product-slice';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import BreadCrumbsProduct from '../../components/bread-crumbs-product/bread-crumbs-product';
import NotFoundPage from '../not-found-page/not-found-page';
import CameraInfo from '../../components/camera-info/camera-info';
import ReviewBlock from '../../components/review-block/review-block';
import ButtonToTop from '../../components/button-to-top/button-to-top';

import BasketModal from '../../components/basket-modal/basket-modal';
import BasketInfoModal from '../../components/basket-info-modal/basket-info-modal';
import { ModalType } from '../../const/modal-type';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { selectCamera } from '../../store/order-slice/order-slice';
import useDisableBackground from '../../hooks/use-disable-background';


function ProductPage():JSX.Element {
  const [isModalAddCameraToBasketOpen, setModalAddCameraToBasketOpen] = useState<boolean>(false);
  const [isModalSuccessAddedCameraToBasketOpen, setModalSuccessAddedCameraToBasketOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleAddCameraToBasketButtonClick = () => {
    setModalAddCameraToBasketOpen(true);
  };

  const handleCloseAddCameraToBasketModal = () => {
    setModalAddCameraToBasketOpen(false);
    dispatch(selectCamera(null));
  };

  const handleOpenSuccessModal = () => {
    setModalSuccessAddedCameraToBasketOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setModalSuccessAddedCameraToBasketOpen(false);
  };

  useDisableBackground(isModalAddCameraToBasketOpen);
  useDisableBackground(isModalSuccessAddedCameraToBasketOpen);

  const status = useAppSelector(selectProductStatus);
  const { fetchCameraByIdAction, fetchCameraReviews } = useActionCreators(productDataActions);
  const camera = useAppSelector(selectProductCamera);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if(id) {
      Promise.all([
        fetchCameraByIdAction(id),
        fetchCameraReviews(id),
      ]);
    }
  }, [fetchCameraByIdAction, fetchCameraReviews, id]);

  if (status === RequestStatus.Loading) {
    return (
      <Spiner />
    );
  }
  if (status === RequestStatus.Failed) {
    return <NotFoundPage />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          {camera ? <BreadCrumbsProduct camera={camera}/> : null}
          <div className="page-content__section">
            {camera ? <CameraInfo camera={camera} onAddCameraInBasketButtonClick={handleAddCameraToBasketButtonClick}/> : null}
          </div>
          <div className="page-content__section">
            <ReviewBlock/>
          </div>
        </div>
        {isModalAddCameraToBasketOpen &&
        <div className='modal is-active'>
          <BasketModal
            modalType={ModalType.AddCameraInBasket}
            onCloseModal={handleCloseAddCameraToBasketModal}
            onOpenSuccessModal={handleOpenSuccessModal}
          />
        </div>}
        {isModalSuccessAddedCameraToBasketOpen &&
        <BasketInfoModal
          modalType={ModalType.CameraAddedToBasket}
          onCloseModal={handleCloseSuccessModal}
          isOnProductOrBasketPage
        />}
      </main>
      <ButtonToTop/>
      <Footer />
    </div>
  );
}

export default ProductPage;
