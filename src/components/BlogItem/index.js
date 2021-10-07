import { useState, useEffect } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import { useParams, useHistory } from 'react-router-dom';
import ContentFooter from 'components/ContentFooter';
import blogs from '../../data/blogs/blogs.json';
import dateFormat from 'dateformat';
import ReactMarkdown from 'react-markdown';
import ReactTimeAgo from 'react-time-ago';
import classNames from 'classnames';
import 'github-markdown-css';
import Share from 'components/Share';
import Link from 'components/Link';

export default function BlogItem() {
  let history = useHistory();
  const { slug } = useParams();
  const blog = blogs[slug];
  if (!blog) {
    history.push('/blog');
  }

  const file_name = `${slug}.md`;
  const [post, setPost] = useState('');

  useEffect(() => {
    import(`../../data/blogs/${file_name}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPost(res))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      {blog && (
        <div className={styles.container}>
          <div className={styles.headlineContainer}>
            <div>
              <Link to={'/blog'} className={styles.linkBack}>
                <div className={styles.arrowBack}></div>
                <div className={styles.headline}>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            </div>
            <div className={styles.shareButton}>
              <Share />
            </div>
          </div>
          <div className={styles.blogContainer}>
            <div className={styles.blogHeader}>
              <div className={styles.circle} />
              <div className={styles.blogInformations}>
                <div className={styles.blogCategory}>{blog.category}</div>
                <div>{blog.author}</div>
                <div className={styles.blogDateAgo}>
                  <ReactTimeAgo date={blog.date} locale="en-US" />
                </div>
              </div>
            </div>
            <div className={styles.imgContainer}>
              <img src={blog.background} />
            </div>
            <div className={styles.blogDate}>
              {dateFormat(new Date(blog.date), 'mmmm d, yyyy')}
            </div>
            <div className={styles.blogContentContainer}>
              <div className={classNames('markdown-body', styles.markdown)}>
                <ReactMarkdown source={post}>{post}</ReactMarkdown>
              </div>
            </div>
          </div>

          <ContentFooter />
        </div>
      )}
    </BaseContainerWithNavbar>
  );
}
