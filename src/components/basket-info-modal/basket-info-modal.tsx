import { useRef } from 'react';
import { ModalType } from '../../const/modal-type';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import GoToBasketButtons from '../go-to-basket-buttons/go-to-basket-buttons';
import IconCheckMark from '../icon-check-mark/icon-check-mark';
import IconReviewOrOrder from '../icon-review-or-order/icon-review-or-order';
import ReturnToCatalogButton from '../return-to-catalog-button/return-to-catalog-button';


type BasketInfoModalProps = {
  onCloseModal: () => void;
  modalType: ModalType;
}

function BasketInfoModal({ onCloseModal, modalType}: BasketInfoModalProps): JSX.Element {

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

  //
  const getButtons = () => modalType === ModalType.CameraAddedToBasket ? <GoToBasketButtons onCloseModal={handleModalClose}/> : <ReturnToCatalogButton onCloseModal={handleModalClose}/>;
  const modalButtons = getButtons();

  const getIcon = () => modalType === ModalType.CameraAddedToBasket ? <IconCheckMark/> : <IconReviewOrOrder/>;
  const modalIcon = getIcon();

  const modalRef = useRef(null);

  useOnClickOutside(modalRef, handleModalClose);
  useKeydownEscClose(handleModalClose);

  return(
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">{modalType}</p>
          {modalIcon}
          <div className="modal__buttons">
            {modalButtons}
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
