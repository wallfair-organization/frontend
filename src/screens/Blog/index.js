import { useState } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import ContentFooter from 'components/ContentFooter';
import { BLOG_CATEGORIES } from '../../constants/BlogCategories';
import BlogCards from 'components/BlogCards';
import CategoryList from 'components/CategoryList';
import blogJson from '../../data/blogs/blogs.json';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);

const Blog = () => {
  const [categories, setCategories] = useState(BLOG_CATEGORIES);
  const blogs = Object.values(blogJson);

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <section className={styles.title}>
          <span>{'Blog'}</span>
        </section>
        {/* <section className={styles.header}>
          <div className={styles.categories}>
            <CategoryList
              //   eventType={eventType}
              categories={categories}
              //   handleSelect={handleSelectCategory}
            />
          </div>
        </section> */}
        <BlogCards blogs={blogs}></BlogCards>
        <ContentFooter />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Blog;
