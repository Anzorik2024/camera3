import { Camera } from '../../types/camera';
import CameraRating from '../camera-rating/camera-rating';
import { formatPrice } from '../../utils/format';
import Tabs from '../tabs/tabs';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { selectCamera } from '../../store/order-slice/order-slice';


type CameraInfoProps = {
  camera: Camera ;
  onAddCameraInBasketButtonClick: () => void;
}
function CameraInfo ({camera, onAddCameraInBasketButtonClick}: CameraInfoProps) : JSX.Element {
  const { name, reviewCount, rating, price, previewImg, previewImgWebp, previewImg2x, previewImgWebp2x, category } = camera;

  const dispatch = useAppDispatch();

  const handleAddToBasketButtonClick = () => {
    dispatch(selectCamera(camera));
    onAddCameraInBasketButtonClick();
  };

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
            />
            <img
              src={`/${previewImg}`}
              srcSet={`/${previewImg2x} 2x`}
              width='560'
              height='480'
              alt={name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{`${category} «${name}»`}</h1>
          <div className="rate product__rate">
            <CameraRating
              rating={rating}
              reviewCount={reviewCount}
            />
          </div>
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
          </p>
          <button
            className="btn btn--purple"
            type="button"
            onClick={handleAddToBasketButtonClick}
          >
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
                Добавить в корзину
          </button>
          <Tabs camera={camera}/>
        </div>

      </div>
    </section>
  );
}

export default CameraInfo;
