import React from 'react';
import styles from './styles.module.scss';

const OfflineBadge = () => {
    return (
        <span className={styles.offlineBadge}>
            <span></span>
            Offline
        </span>
    );
};

export default OfflineBadge;
