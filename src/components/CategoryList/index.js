import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import CategoryListItem from './CategoryListItem';
import HorizontalScroll from 'react-scroll-horizontal';
import { useResizeDetector } from 'react-resize-detector';

function CategoryList({ categories }) {
  const { width, ref } = useResizeDetector();
  const [shouldDisplayScroll, setShouldDisplayScroll] = useState(false);

  useEffect(() => {
    const childrenWidth = _.get(
      ref.current,
      'firstChild.firstChild.offsetWidth',
      0
    );

    if (childrenWidth < width) {
      setShouldDisplayScroll(false);
    } else {
      setShouldDisplayScroll(true);
    }
  }, [width]);

  const children = categories.map((item, index) => (
    <CategoryListItem key={index} categoryItem={item} itemId={index} />
  ));

  if (!shouldDisplayScroll) {
    return (
      <div ref={ref}>
        <div>
          <div className={styles.categoryList}>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={styles.categoryList}>
      <HorizontalScroll className={styles.horizontalScroll}>
        {children}
      </HorizontalScroll>
    </div>
  );
}

export default CategoryList;
