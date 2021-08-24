import { useRef, useEffect } from 'react';

export const useOutsideClick = outsideClickHandler => {
    const elementRef = useRef();

    const handleOutsideClick = event => {
        if (elementRef.current && !elementRef.current.contains(event.target)) {
            if (typeof outsideClickHandler === 'function')
                outsideClickHandler(event);
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleOutsideClick);

        return () => {
            document.removeEventListener('mouseup', handleOutsideClick);
        };
    }, []);

    return elementRef;
};
