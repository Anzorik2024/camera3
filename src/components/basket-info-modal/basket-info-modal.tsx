import { useRef } from 'react';
import { ModalType } from '../../const/modal-type';
import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import GoToBasketButtons from '../go-to-basket-buttons/go-to-basket-buttons';
import IconCheckMark from '../icon-check-mark/icon-check-mark';
import IconReviewOrOrder from '../icon-review-or-order/icon-review-or-order';
import ReturnToCatalogButton from '../return-to-catalog-button/return-to-catalog-button';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getOrderSendingStatus } from '../../store/selectors';
import { WarningMessage } from '../../const/warning-message';
import { FetchStatus } from '../../const/fetch-status';
import useTrapFocus from '../../hooks/use-trap-focus';


type BasketInfoModalProps = {
  onCloseModal: () => void;
  modalType: ModalType;
}

function BasketInfoModal({ onCloseModal, modalType}: BasketInfoModalProps): JSX.Element {

  const isOrderSendingStatus = useAppSelector(getOrderSendingStatus);
  const isOrderSendStatusError = isOrderSendingStatus === FetchStatus.Error;

  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  const handleModalClose = () => {
    onCloseModal();
  };

  const getModalTitle = () => {
    switch (modalType) {
      case ModalType.CamerasOrdered:
        return isOrderSendStatusError ? WarningMessage.OrderError : ModalType.CamerasOrdered;
      case ModalType.CameraAddedToBasket:
        return ModalType.CameraAddedToBasket;
    }
  };

  const isOpen = modalType === ModalType.CamerasOrdered || modalType === ModalType.CameraAddedToBasket;

  const modalTitle = getModalTitle();

  const getButtons = () => modalType === ModalType.CameraAddedToBasket ?
    <GoToBasketButtons onCloseModal={handleModalClose} isOpen={isOpen}/>
    : <ReturnToCatalogButton onCloseModal={handleModalClose} isOpen={isOpen}/>;

  const modalButtons = getButtons();

  const getIcon = () => modalType === ModalType.CameraAddedToBasket ? <IconCheckMark/> : <IconReviewOrOrder/>;
  const modalIcon = getIcon();

  const modalRef = useRef(null);

  useOnClickOutside(modalRef, handleModalClose);
  useKeydownEscClose(handleModalClose);
  useTrapFocus(modalRef, buttonCloseRef,isOpen);

  return(
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" tabIndex={0} ref={modalRef}>
          <p className="title title--h4">{modalTitle}</p>
          {modalIcon}
          <div className="modal__buttons">
            {modalButtons}
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            ref={buttonCloseRef}
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
