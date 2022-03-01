import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Routes from '../../../constants/Routes';
import styles from './styles.module.scss';
import EventTypes from 'constants/EventTypes';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';

function CategoryListItem({ categoryItem, eventType }) {
  
  return (
    <>
      <section className={styles.categoryListItem}>
        {eventType ? 
          <Link
            to={Routes.getRouteWithParameters(
              {
                [EventTypes.streamed]: Routes.liveEvents,
                [EventTypes.nonStreamed]: Routes.events,
              }[eventType] || Routes.home,
              {
                category: encodeURIComponent(categoryItem.value),
              }
            )}
            className={categoryItem.disabled ? styles.linkDisabled : null}
          >
            <Button className={classNames(styles.categoryButton, categoryItem.isActive && styles.active)} theme={ButtonTheme.secondaryButton}>
              <img
                src={categoryItem.image}
                alt={`category ${categoryItem.value}`}/>
              {categoryItem.label ?? categoryItem.value}
            </Button>
          </Link>
        :
        
          <Button className={classNames(styles.categoryButton, categoryItem.isActive && styles.active)} theme={ButtonTheme.secondaryButton}>
            <img
              src={categoryItem.image}
              alt={`category ${categoryItem.value}`}/>
            {categoryItem.label ?? categoryItem.value}
          </Button> 
        }
      </section>
    </>
  );
}

export default CategoryListItem;
