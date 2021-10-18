import styles from './styles.module.scss';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import Icon from '../Icon';
import classNames from 'classnames';
import { useState } from 'react';

const News = ({ className, showMoreButton = false, limit = 0 }) => {
  const [newsToShow, setNewsToShow] = useState(limit);
  const [loadMoreButton, setLoadMoreButton] = useState(showMoreButton);

  let news = useSelector(state => state.event.newsData?.articles) || [];
  if (loadMoreButton && news.length && newsToShow) {
    news = news.slice(0, newsToShow);
  }
  return (
    <>
      <div className={classNames(styles.newsTicker, className)}>
        {news.map(({ title, description, url, source }) => (
          <div key={title} className={styles.newsItem}>
            <div className={styles.newsTitle}>{_.unescape(title)}</div>
            <div className={styles.newsDesc}>{_.unescape(description)}</div>
            <a
              className={styles.newsLink}
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <Icon iconType={'activities'} iconTheme={'white'} />
              {source?.name
                ? `Read more on ${_.unescape(source.name)}`
                : 'Read more'}
            </a>
          </div>
        ))}
      </div>
      {loadMoreButton && (
        <div
          className={styles.loadMoreNews}
          onClick={() => {
            setNewsToShow(0);
            setLoadMoreButton(false);
          }}
        >
          <p>Load More</p>
        </div>
      )}
    </>
  );
};

export default News;
