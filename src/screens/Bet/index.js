import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _                            from 'lodash';
import darkModeLogo                 from '../../data/images/logo-demo.svg';
import FixedIconButton              from '../../components/FixedIconButton';
import IconType                     from '../../components/Icon/IconType';
import Icon                         from '../../components/Icon';
import Link                         from '../../components/Link';
import LiveBadge                    from 'components/LiveBadge';
import Routes                       from '../../constants/Routes';
import styles                       from './styles.module.scss';
import TimeLeftCounter              from 'components/TimeLeftCounter';
import ViewerBadge                  from 'components/ViewerBadge';
import { Carousel }                 from 'react-responsive-carousel';
import { connect }                  from 'react-redux';
import { PopupActions }             from '../../store/actions/popup';
import { useParams }                from 'react-router-dom';
import { useSelector }              from 'react-redux';
import { useState }                 from 'react';
import TwitchEmbedVideo             from '../../components/TwitchEmbedVideo';
import BetView                      from '../../components/BetView';
import RelatedBetCard               from '../../components/RelatedBetCard';
import { useHistory }               from 'react-router-dom';
import Chat                         from '../../components/Chat';
import classNames                   from 'classnames';
import FixedEventCreationIconButton from '../../components/FixedEventCreationIconButton';
import { SwiperSlide, Swiper }      from 'swiper/react';
import SwitchableContainer          from '../../components/SwitchableContainer';
import SwitchableHelper             from '../../helper/SwitchableHelper';
import React                        from 'react';

const Bet = ({ showPopup }) => {
          const history                            = useHistory();
          const [swiper, setSwiper]                = useState(null);
          const { eventId, betId }                 = useParams();
          const [currentSlide, setCurrentSlide]    = useState(0);
          const [betAction, setBetAction]          = useState(0);
          const [activeBetId, setActiveBetId]      = useState(betId || null);
          const [betViewIsOpen, setBetViewIsOpen]  = useState(false); 

          const event = useSelector(
              (state) => _.find(
                  state.event.events,
                  {
                      _id: eventId,
                  },
              ),
          );

          const moveToSlide = (index) => {
              if (swiper) {
                  swiper.slideTo(index);
              }
          };

          const renderChatButton = () => {
              return (
                  <FixedIconButton
                      className={styles.fixedChatButton}
                      onClick={() => moveToSlide(1)}
                      iconType={IconType.chat}
                      left={true}
                  />
              );
          };

          const renderEventCreationButton = () => {
              return (
                  <FixedEventCreationIconButton
                      eventId={eventId}
                  />
              );
          };

          const getRelatedBets = () => {
              return _.get(event, 'bets', []);
          };

          const getRelatedBetSliderPages = () => {
              return _.ceil(_.size(getRelatedBets()) / 3);
          };

          const renderRelatedBetList = () => {
              return _.map(
                  getRelatedBets(),
                  (bet, index) => {
                      return renderRelatedBetCard(bet, index);
                  },
              );
          };

          const onBetClick = (betId) => {
              return () => {
                  const eventId = _.get(event, '_id', null);

                  history.push(Routes.getRouteWithParameters(
                      Routes.bet,
                      {
                          eventId,
                          betId,
                      },
                  ));

                  setActiveBetId(betId);
                  setBetViewIsOpen(true);
              };
          };

          const renderRelatedBetCard = (bet, index) => {
              if (bet) {
                  const betId = _.get(bet, '_id');

                  return (
                      <RelatedBetCard
                          key={index}
                          bet={bet}
                          onClick={onBetClick(betId)}
                      />
                  );
              }

              return <div />;
          };

          const renderRelatedBetSliders = () => {
              const size = getRelatedBetSliderPages();

              return _.map(
                  _.range(0, size),
                  (sliderPage, index) => renderRelatedBetSlider(sliderPage, index),
              );
          };

          const renderRelatedBetSlider = (pageIndex, index) => {
              const bets        = getRelatedBets();
              const indexes = [];
              const listLength = bets.length > 3 ? 3 : bets.length;

              for(let i=0; i<listLength; i++) {
                indexes.push(pageIndex * 3 + i);
              }

              return (
                  <div
                      key={index}
                      className={classNames(
                          styles.carouselSlide,
                          styles.relatedBetSlide,
                      )}
                  >
                      {renderRelatedBetCard(
                          _.get(
                              bets,
                              '[' + indexes[0] + ']',
                          ),
                      )}
                      {renderRelatedBetCard(
                          _.get(
                              bets,
                              '[' + indexes[1] + ']',
                          ),
                      )}
                      {renderRelatedBetCard(
                          _.get(
                              bets,
                              '[' + indexes[2] + ']',
                          ),
                      )}
                  </div>
              );
          };

          const renderBetSidebarContent = () => {
            if(betViewIsOpen) {
                return (
                    <div>
                        <div 
                            className={styles.betViewClose} 
                            onClick={onBetClose()}
                        >
                            <Icon iconType={'arrowLeft'} iconTheme={'white'} className={styles.arrowBack}/>
                            <span>Go back to all tracks</span>
                        </div>
                        <div className={styles.betViewContent}>
                            <BetView
                                closed={false}
                                showEventEnd={true}
                            />
                        </div>
                    </div>
                );
            }

            return (
                <div>
                    {renderSwitchableView()}
                    <div className={styles.contentContainer}>
                        {renderContent()}
                    </div>
                </div>
            );
        }

        

        const onBetActionSwitch = (newIndex) => {
            setBetAction(newIndex);
        };

          const renderSwitchableView = () => {
            const switchableViews = [
                SwitchableHelper.getSwitchableView(
                    'Event Trades',
                ),
                SwitchableHelper.getSwitchableView(
                    'My Trades',
                ),
            ];
    
            return (
                <SwitchableContainer
                    className={styles.switchableViewContainer}
                    whiteBackground={false}
                    switchableViews={switchableViews}
                    currentIndex={betAction}
                    setCurrentIndex={onBetActionSwitch}
                />
            );
        };

        const renderContent = () => {
            if (betAction === 0) {

                return (
                    <div className={styles.relatedBets}>
                        <Carousel
                            className={classNames(
                                styles.relatedBetsCarousel,
                                getRelatedBets().length > 3 ? '' : styles.oneCarouselPage,
                            )}
                            dynamicHeight={false}
                            emulateTouch={true}
                            infiniteLoop={true}
                            autoPlay={false}
                            showArrows={false}
                            showStatus={false}
                        >
                            {renderRelatedBetSliders()}
                        </Carousel>
                    </div>
                );
            }

            return (
                <div className={styles.relatedBetsNone}>
                    No trades placed.
                </div>
            )
        };

        const onBetClose = () => {
            return () => {
                const eventId = _.get(event, '_id', null);

                history.push(Routes.getRouteWithParameters(
                    Routes.bet,
                    {
                        eventId,
                        betId: '',
                    },
                ));

                setActiveBetId(null);
                setBetViewIsOpen(false);
            };
          }

          const renderMobileMenuIndicator = (index) => {
              return (
                  <span
                      className={currentSlide === index ? styles.active : ''}
                      onClick={() => {
                          setCurrentSlide(index);
                      }}
                  >
                  </span>
              );
          };

          if (!event) {
              return null;
          }

          return (
              <div className={styles.bet}>
                  <div className={styles.upperLeftOval}>
                  </div>
                  <div className={styles.centeredBottomOval}>
                  </div>
                  <div className={styles.headlineContainer}>
                      <div>
                          <Link
                              to={Routes.home}
                              className={styles.arrowBack}
                          >
                          </Link>
                          <div className={styles.headline}>
                              <h1>
                                  {_.get(event, 'name')}
                              </h1>
                              <div>
                                  <LiveBadge />
                                  <ViewerBadge viewers={1123} />
                              </div>
                          </div>
                      </div>
                      <div className={styles.logo}>
                          <div>
                              <img
                                  src={darkModeLogo}
                                  alt="Wallfair"
                              />
                          </div>
                      </div>
                  </div>
                  <div className={styles.row}>
                      <div className={styles.columnLeft}>
                          <div className={styles.streamContainer}>
                              <TwitchEmbedVideo
                                  video={event.streamUrl}
                              />
                              <div className={styles.timeLeft}>
                                  <span>
                                      End of Event:
                                  </span>
                                  <TimeLeftCounter endDate={new Date(_.get(event, 'endDate'))} />
                              </div>
                          </div>
                          <Chat
                              className={styles.desktopChat}
                              event={event}
                          />
                          <div className={styles.mobileCarousel}>
                              <Swiper
                                  slidesPerView={1}
                                  pagination={{
                                      'clickable': false,
                                  }}
                                  autoHeight={true}
                                  onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                                  onSwiper={setSwiper}
                              >
                                  <SwiperSlide className={styles.carouselSlide}>
                                      <BetView
                                          closed={false}
                                          showEventEnd={true}
                                      />
                                  </SwiperSlide>
                                  <SwiperSlide className={styles.carouselSlide}>
                                      <Chat
                                          event={event}
                                          className={styles.mobileChat}
                                      />
                                  </SwiperSlide>
                                  <SwiperSlide className={styles.carouselSlide}>
                                      <div
                                          className={styles.headline}
                                          style={{ flexDirection: 'row', display: 'flex', marginBottom: '1rem', alignItems: 'center' }}
                                      >
                                          <h2 style={{ fontSize: '16px', marginRight: '0.5rem' }}>🚀 Related Bets</h2>
                                          <LiveBadge />
                                      </div>
                                      <div>
                                          {renderRelatedBetList()}
                                      </div>
                                  </SwiperSlide>
                              </Swiper>
                          </div>
                      </div>
                      <div className={styles.columnRight}>
                          {renderBetSidebarContent()}
                      </div>
                  </div>
                  <div className={styles.mobileMenu}>
                      <div className={styles.indicators}>
                          {renderMobileMenuIndicator(0)}
                          {renderMobileMenuIndicator(1)}
                          {renderMobileMenuIndicator(2)}
                      </div>
                  </div>
                  {renderEventCreationButton()}
                  {renderChatButton()}
              </div>
          );
      }
;

const mapDispatchToProps = (dispatch) => {
          return {
              showPopup: (popupType) => {
                  dispatch(PopupActions.show(popupType));
              },
          };
      }
;

export default connect(
    null,
    mapDispatchToProps,
)(Bet);
