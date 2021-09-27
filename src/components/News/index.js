import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import Icon from '../Icon';

const News = () => {
  const news = useSelector(state => state.event.newsData?.articles) || [];
  return (
    <div className={styles.newsTicker}>
      {news.map(({ title, description, url, source }) => (
        <div key={title} className={styles.newsItem}>
          <div className={styles.newsTitle}>{title}</div>
          <div className={styles.newsDesc}>{description}</div>
          <a
            className={styles.newsLink}
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            <Icon iconType={'activities'} iconTheme={'white'} />
            {source?.name ? `Read more on ${source.name}` : 'Read more'}
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
