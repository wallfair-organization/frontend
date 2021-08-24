import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { connect, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import Routes from '../../../constants/Routes';
import styles from './styles.module.scss';
import Search from '../../Search';
import EventCard from '../../EventCard';
import { EventActions } from '../../../store/actions/event';

function CategoryListItem({ categoryItem }) {
    return (
        <>
            <section className={styles.categoryListItem}>
                <Link
                    to={Routes.getRouteWithParameters(
                        categoryItem.type === 'image'
                            ? Routes.liveEvents
                            : Routes.events,
                        {
                            category: categoryItem.value,
                        }
                    )}
                >
                    <div
                        className={classNames({
                            [styles.box]: categoryItem.type === 'image',
                            [styles.boxIcon]: categoryItem.type === 'icon',
                            [styles.active]: categoryItem.isActive,
                        })}
                        role="button"
                        tabIndex="0"
                    >
                        <img
                            src={categoryItem.image}
                            alt={`category ${categoryItem.value}`}
                            className={classNames({
                                [styles.image]: categoryItem.type === 'image',
                                [styles.imageIcon]:
                                    categoryItem.type === 'icon',
                                [styles.active]: categoryItem.isActive,
                            })}
                        />
                        {categoryItem.type === 'icon' && (
                            <label
                                className={classNames(styles.label, {
                                    [styles.active]: categoryItem.isActive,
                                })}
                            >
                                {categoryItem.value}
                            </label>
                        )}
                    </div>
                </Link>
            </section>
        </>
    );
}

export default CategoryListItem;
