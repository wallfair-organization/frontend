import React from 'react';
import styles from './styles.module.scss';
import CategoryListItem from './CategoryListItem';

function CategoryList({ categories, eventType }) {
  return (
    <>
      <section className={styles.categoryList}>
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
