import {useEffect} from 'react';

const useElementFocus = (isOpen:boolean, elementRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (elementRef.current) {
      if (elementRef.current) {
        elementRef.current.style.visibility = isOpen ? 'visible' : 'hidden';
        elementRef.current?.focus();
      }
    }
  }, [isOpen, elementRef]);
};
export default useElementFocus;
