import { useRef } from 'react';
import { ModalType } from '../../const/modal-type';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';


type BasketInfoModalProps = {
  onCloseModal: () => void;
  modalType: ModalType;
  isOnProductOrBasketPage?: boolean;
}

function BasketInfoModal({ onCloseModal, modalType, isOnProductOrBasketPage }: BasketInfoModalProps): JSX.Element {

  const handleModalClose = () => {
    onCloseModal();
  };

  // const getModalTitle = () => {
  //   switch (modalType) {
  //     // case ModalType.CamerasOrdered:
  //     //   return isOrderSendStatusError ? WarningMessage.OrderError : ModalTitle.CamerasOrdered;
  //     case ModalType.CameraAddedToBasket:
  //       return ModalTitle.CameraAddedToBasket;
  //   }
  // };

  const modalRef = useRef(null);

  useOnClickOutside(modalRef, handleModalClose);
  useKeydownEscClose(handleModalClose);

  return(
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">{modalType}</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <a className="btn btn--transparent modal__btn" href="#">Продолжить покупки</a>
            <button className="btn btn--purple modal__btn modal__btn--fit-width">Перейти в корзину</button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleModalClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default BasketInfoModal;
