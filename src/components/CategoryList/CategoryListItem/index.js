import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Routes from '../../../constants/Routes';
import styles from './styles.module.scss';
import EventTypes from 'constants/EventTypes';

function CategoryListItem({ categoryItem, eventType }) {
  return (
    <>
      <section className={styles.categoryListItem}>
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
          <div
            className={classNames({
              [styles.box]: categoryItem.type === 'image',
              [styles.boxIcon]: categoryItem.type === 'icon',
              [styles.active]: categoryItem.isActive,
            })}
            role="button"
            tabIndex="0"
            title={categoryItem.value}
          >
            <img
              src={categoryItem.image}
              alt={`category ${categoryItem.value}`}
              className={classNames({
                [styles.image]: categoryItem.type === 'image',
                [styles.imageIcon]: categoryItem.type === 'icon',
                [styles.active]: categoryItem.isActive,
                [styles.disabled]: categoryItem.disabled,
              })}
            />
            {categoryItem.type === 'icon' && (
              <label
                className={classNames(styles.label, {
                  [styles.active]: categoryItem.isActive,
                })}
              >
                {categoryItem.label ?? categoryItem.value}
              </label>
            )}
          </div>
        </Link>
      </section>
    </>
  );
}

export default CategoryListItem;
