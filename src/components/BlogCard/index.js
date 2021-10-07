import Link from 'components/Link';
import ReactTimeAgo from 'react-time-ago';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { EVENT_CATEGORIES } from '../../constants/EventCategories';

export default function BlogCard({ index, blog }) {
  const getEventCardStyle = () => {
    return {
      backgroundImage: 'url("' + blog.background + '")',
    };
  };

  const getStickerStyle = category => {
    const cat = EVENT_CATEGORIES.find(c => c.value === category);
    console.log(cat);
    if (!cat) return {};
    return {
      backgroundImage: 'url("' + cat.image + '")',
    };
  };
  const eventCardClass = '';
  return (
    <div className={styles.betCardContainer}>
      <div className={classNames(styles.betCard, eventCardClass)}>
        <div className={styles.picture} style={getEventCardStyle()} />
        <div className={styles.header}>
          <span className={styles.section}>{blog.category}</span>

          <div className={styles.special}>
            <div className={styles.timer}>
              <span>
                <ReactTimeAgo date={blog.date} locale="en-US" />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div
            className={classNames([styles.categorySticker])}
            style={getStickerStyle('News')}
          />

          <div className={styles.titleContainer} title={blog.title}>
            <span className={styles.title}>{blog.title}</span>
          </div>
          <div className={styles.textContainer}>
            <span className={styles.text}>{blog.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function BlogCard({ index, blog }) {
//   return (
//     <div key={index} className={styles.wrapper}>
//       <Link to={`/blog/${blog.slug}`} className={classNames(styles.gameLink)}>
//         <div className={classNames(styles.blogItem)}>
//           <div className={styles.blogHeader}>
//             <div className={styles.circle} />
//             <div className={styles.blogInformations}>
//               <div className={styles.blogCategory}>{blog.category}</div>
//               <div>{blog.author}</div>
//               <div className={styles.blogDate}>
//                 {/* {blog.date} */}
//                 <ReactTimeAgo date={blog.date} locale="en-US" />
//               </div>
//             </div>
//           </div>
//           <div className={styles.blogTitle}>{blog.title}</div>
//           <div className={styles.blogText}>{blog.text}</div>
//           <div className={styles.imgContainer}>
//             <img src={blog.background} />
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }
