import styles from './styles.module.scss';
import BlogCard from 'components/BlogCard';
import Link from 'components/Link';

export default function BlogCards({ blogs }) {
  return (
    <div className={styles.blogsContainer}>
      <div className={styles.blogs}>
        {blogs.map((blog, index) => (
          <Link to={`/blog/${blog.slug}`} key={index}>
            <BlogCard blog={blog} index={index}></BlogCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
