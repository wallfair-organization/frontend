import React, { useState, useEffect, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import Search from '../../Search';
import Select from '../../Select';
import EventCard from '../../EventCard';
import CategoryList from '../../CategoryList';
import { useMappedActions } from './hooks/useMappedActions';
import { useSortFilter } from './hooks/useSortFilter';
import { useRouteHandling } from './hooks/useRouteHandling';

function EventsContent({ eventType, categories, setCategories }) {
    const [searchInput, setSearchInput] = useState('');

    const { location, category } = useRouteHandling(eventType);

    const { fetchFilteredEvents, resetDefaultParamsValues } =
        useMappedActions(eventType);

    const { handleSelectSortItem, selectedSortItem, sortOptions } =
        useSortFilter();

    const handleSearchSubmit = val => {
        fetchFilteredEvents({
            searchQuery: searchInput,
        });
    };

    const handleSelectCategory = useCallback(
        value => {
            const updatedCats = categories.map(cat => {
                if (value !== cat.value)
                    return {
                        ...cat,
                        isActive: false,
                    };
                return {
                    ...cat,
                    isActive: true,
                };
            });

            setCategories(updatedCats);
        },
        [setCategories]
    );

    const events = useSelector(state => state.event.filteredEvents);

    const mappedTags = id =>
        events.find(event => event._id === id)?.tags.map(tag => tag.name) || [];

    useEffect(() => {
        handleSelectCategory(category);

        fetchFilteredEvents({
            category: category,
            sortBy: selectedSortItem,
        });
    }, [category, selectedSortItem, fetchFilteredEvents, handleSelectCategory]);

    useEffect(() => {
        return () => {
            resetDefaultParamsValues();
        };
    }, []);

    return (
        <>
            <section className={styles.title}>
                {eventType === 'streamed' ? 'Live streams' : 'Events'}
            </section>
            <section className={styles.header}>
                <div className={styles.categories}>
                    <CategoryList
                        categories={categories}
                        handleSelect={handleSelectCategory}
                    />
                </div>
                <div className={styles.search}>
                    <Search
                        value={searchInput}
                        handleChange={value => setSearchInput(value)}
                        handleConfirm={handleSearchSubmit}
                    />
                </div>
                <div className={styles.sort}>
                    <Select
                        value={selectedSortItem}
                        placeholder="Sort by"
                        options={sortOptions}
                        handleSelect={handleSelectSortItem}
                    />
                </div>
            </section>
            <section className={styles.main}>
                {events.map(item => (
                    <Link
                        to={{
                            pathname: `/trade/${item._id}`,
                            state: { fromLocation: location },
                        }}
                        key={item._id}
                    >
                        <EventCard
                            key={item._id}
                            title={item.name}
                            organizer={''}
                            viewers={12345}
                            live={eventType === 'streamed'}
                            tags={mappedTags(item._id)}
                            image={item.previewImageUrl}
                            eventEnd={item.date}
                        />
                    </Link>
                ))}
            </section>
        </>
    );
}

export default EventsContent;
