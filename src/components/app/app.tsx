import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useActionCreators} from '../../hooks/use-action-creators';
import { useAppSelector } from '../../hooks/use-app-selector';
import Spiner from '../spiner/spiner';
import MainPage from '../../pages/main-page/main-page';
import ProductPage from '../../pages/product-page/product-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import BasketPage from '../../pages/basket-page/basket-page';
import { selectIsLoading } from '../../store/selectors';
import { ToastContainer, toast} from 'react-toastify';
import { WarningMessage } from '../../const/warning-message';
import 'react-toastify/dist/ReactToastify.css';

import { AppRoute } from '../../const/app-route';
import { catalogReducerAction } from '../../store/catalog-slice/catalog-slice';
import { getCamerasInTheBasket } from '../../store/selectors';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { downloadCameraToBasket } from '../../store/order-slice/order-slice';
import { Cameras } from '../../types/camera';
import { CART_KEY } from '../../const/const';


function App (): JSX.Element {

  const { fetchAllCameraAction} = useActionCreators(catalogReducerAction);
  const camerasInTheBasket = useAppSelector(getCamerasInTheBasket);
  const dispatch = useAppDispatch();
  const storedCart = localStorage.getItem(CART_KEY);

  useEffect(() => {
    if(storedCart && camerasInTheBasket.length === 0) {
      const parsedCart = JSON.parse(storedCart) as Cameras;
      dispatch(downloadCameraToBasket(parsedCart));
    }
  }, [dispatch,storedCart, camerasInTheBasket]);

  useEffect(() => {
    if(camerasInTheBasket.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(camerasInTheBasket));
    }
  }, [camerasInTheBasket]);


  useEffect(() => {
    fetchAllCameraAction()
      .unwrap()
      .catch(() => {
        toast.error(WarningMessage.DataLoadingWarning);
      });

  }, [fetchAllCameraAction]);

  const isLoading = useAppSelector(selectIsLoading);

  if (isLoading) {
    return (
      <Spiner />
    );
  }


  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage/>}
        >
        </Route>
        <Route
          path={`${AppRoute.Product}/:id`}
          element={<ProductPage/>}
        >
        </Route>
        <Route
          path={AppRoute.Basket}
          element={<BasketPage/>}
        >
        </Route>
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage/>}
        >
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
