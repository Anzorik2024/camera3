import { useRef } from 'react';

import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getSelectCamera } from '../../store/selectors';
import BasketItemShort from '../basket-item-short/basket-item-short';
import { ModalType } from '../../const/modal-type';

import RemoveItemButtons from '../remove-item-buttons/remove-item-buttons';
import AddItemButton from '../add-item-button/add-item-button';

type BasketModalProps = {
  onCloseModal: () => void;
  onOpenSuccessModal: () => void;
  modalType: ModalType;
}

function BasketModal({onCloseModal, modalType, onOpenSuccessModal}: BasketModalProps) : JSX.Element {
  const selectedCamera = useAppSelector(getSelectCamera);

  const modalRef = useRef(null);
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  const handleModalCloseClick = () => {
    onCloseModal();
  };

  const isOpen = modalType === ModalType.AddCameraInBasket || modalType === ModalType.RemoveCameraFromBasket;

  const getButtons = () => {
    if (modalType === ModalType.RemoveCameraFromBasket && selectedCamera) {
      return (
        <RemoveItemButtons
          cameraId={selectedCamera.id}
          onCloseModal={onCloseModal}
          isOpen={isOpen}
          buttonCloseRef={buttonCloseRef}
        />
      );
    }

    if (modalType === ModalType.AddCameraInBasket && selectedCamera) {
      return (
        <AddItemButton camera={selectedCamera}
          onCloseModal={handleModalCloseClick}
          onOpenSuccessModal={onOpenSuccessModal}
          isOpen={isOpen}
          buttonCloseRef={buttonCloseRef}
        />
      );
    }
  };
  const buttons = getButtons();

  useOnClickOutside(modalRef, handleModalCloseClick);
  useKeydownEscClose(handleModalCloseClick);
  return (
    <div className="modal__wrapper" data-testid='basket-modal'>
      <div className="modal__overlay"></div>
      <div className="modal__content" ref={modalRef}>
        <p className="title title--h4">{modalType}</p>
        {selectedCamera && <BasketItemShort camera={selectedCamera} modalType={modalType}/>}
        <div className="modal__buttons" >
          {buttons}
        </div>
        <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalCloseClick} ref={buttonCloseRef}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default BasketModal;
