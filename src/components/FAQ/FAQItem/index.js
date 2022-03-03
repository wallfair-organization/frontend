import { useState } from 'react';
import styles from './styles.module.scss';
import {ReactComponent as MinusIcon} from '../../../data/icons/faq/minus-icon.svg';
import {ReactComponent as PlusIcon} from '../../../data/icons/faq/plus-icon.svg';
import classNames from 'classnames';

const FAQItem = ({title, answer, align}) => {

  const [show, setShow] = useState(false);

  const showAnswerHandler = () => {
    setShow(true);
  };

  const hideAnswerHandler = () => {
    setShow(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.faqTitle}
        onClick={show ? hideAnswerHandler : showAnswerHandler}
      >
        <h4>{title}</h4>
        {show ? (
          <MinusIcon />
        ) : (
          <PlusIcon />
        )}
      </div>

      {/* {show && <div className={styles.faqLine}></div>} */}

      {show && <div className={classNames(styles.faqAnswer, align === 'left' ? styles.left : null)} dangerouslySetInnerHTML={{__html: answer.split('\n').join('<br />')}} />}
    </div>
  );
};

export default FAQItem;