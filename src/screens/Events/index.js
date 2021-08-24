import { useState } from 'react';
import styles from './styles.module.scss';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import EventsContent from 'components/Events/EventsContent';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';

const Events = () => {
    const [categories, setCategories] = useState(EVENT_CATEGORIES);

    return (
        <BaseContainerWithNavbar withPaddingTop={true}>
            <EventsContent
                eventType="non-streamed"
                categories={categories}
                setCategories={setCategories}
            />
        </BaseContainerWithNavbar>
    );
};

export default Events;
