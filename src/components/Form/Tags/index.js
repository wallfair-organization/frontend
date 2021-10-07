import { ReactComponent as AddTagIcon } from './add-icon.svg';
import Input from '../Input';
import styles from './styles.module.scss';

const Tags = ({
  tags = [],
  onTagChange,
  addTag,
  removeTag,
  max = 0,
  preventAdd = false,
  preventRemove = false,
}) => {
  const isAddTagVisible =
    !preventAdd && (isNaN(max) || max <= 0 || tags.length < max);

  return (
    <div className={styles.tags}>
      {tags.map((tag, index) => (
        <div key={tag._id} className={styles.tag}>
          <Input
            type="text"
            value={tags[index].name}
            onChange={value => onTagChange(value, tag._id)}
            className={styles.tagInput}
          />
          {!preventRemove && (
            <span
              className={styles.deleteTag}
              onClick={() => removeTag(tag._id)}
            >
              x
            </span>
          )}
        </div>
      ))}
      {isAddTagVisible && (
        <div className={styles.tag}>
          <div className={styles.newTag} onClick={addTag}>
            <AddTagIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
