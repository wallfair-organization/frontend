import styles from './styles.module.scss';
import classNames from 'classnames';
import Button from 'components/Button';
import ButtonTheme from 'components/Button/ButtonTheme';

function GameProviderFilter({ providers, className, setSelectedProvider, selectedProvider }) {
  return (
    <>
      <section className={classNames(styles.providersList, className)}>
        {providers.map((providerItem, index) => (
          <Button 
            key={index}
            className={classNames(styles.providerButton, selectedProvider === providerItem.value && styles.active)} 
            theme={ButtonTheme.secondaryButton}
            onClick={() => setSelectedProvider(providerItem.value)}
          >
            {providerItem.value !== 'all' ? <img src={providerItem.image} alt={`${providerItem.label} logo`}  /> : 'All Providers'}
          </Button>
        ))}
      </section>
    </>
  );
}

export default GameProviderFilter;



 
