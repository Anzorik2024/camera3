import { useRef } from 'react';

import useOnClickOutside from '../../hooks/use-on-click-outside';
import { useKeydownEscClose } from '../../hooks/use-keydown-esc-close';
import useTrapFocus from '../../hooks/use-trap-focus';// переделать для новой кнопки
import { useAppSelector } from '../../hooks/use-app-selector';
import { getSelectCamera } from '../../store/selectors';
import BasketItemShort from '../basket-item-short/basket-item-short';

type BasketModalProps = {
  onCloseModal: () => void;
  isOpen: boolean;
}

function BasketModal({ onCloseModal, isOpen}: BasketModalProps) : JSX.Element {
  const selectedCamera = useAppSelector(getSelectCamera);


  const modalRef = useRef(null);
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  const handleModalCloseClick = () => {
    onCloseModal();
  };

  // const handleButtonOrderClick = () => {
  // }; изменить с номера телефона на открывание попапа

  useOnClickOutside(modalRef, handleModalCloseClick);
  useKeydownEscClose(handleModalCloseClick);
  // useTrapFocus(telInputRef, buttonCloseRef,isOpen); передалать фокустрап

  return (
    <div className="modal__wrapper" data-testid='basket-modal'>
      <div className="modal__overlay"></div>
      <div className="modal__content" ref={modalRef}>
        <p className="title title--h4">Свяжитесь со мной</p>
        {selectedCamera && <BasketItemShort camera={selectedCamera}/>}
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
