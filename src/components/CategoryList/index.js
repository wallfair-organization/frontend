import React from 'react';
import styles from './styles.module.scss';
import CategoryListItem from './CategoryListItem';
import classNames from 'classnames';

function CategoryList({ categories, eventType, className }) {
  return (
    <>
      <section className={classNames(styles.categoryList, className)}>
        {categories.map((item, index) => (
          <CategoryListItem
            key={index}
            categoryItem={item}
            eventType={eventType}
          />
        ))}
      </section>
    </>
  );
}

export default CategoryList;
