import { useRef, useEffect } from 'react';

export const useChatIntersection = (parentRef, setVisible) => {
  const elementRef = useRef();

  const isInView = (parent, el) => {
    const container = parent.current;
    const element = el.current;
    const { bottom, height, top } = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return top <= containerRect.top
      ? containerRect.top - top <= height
      : bottom - containerRect.bottom <= height;
  };

  useEffect(() => {
    const { current } = elementRef;
    const intObserver = new IntersectionObserver(
      ([entry]) => {
        setVisible(
          !entry.isIntersecting ? false : isInView(parentRef, elementRef)
        );
      },
      {
        threshold: 0.65,
      }
    );

    if (current) intObserver.observe(current);

    return () => {
      if (current) {
        intObserver.unobserve(current);
        intObserver.disconnect(current);
      }
    };
  }, []);

  return elementRef;
};
