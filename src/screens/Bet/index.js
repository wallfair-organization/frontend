import 'react-responsive-carousel/lib/styles/carousel.min.css';
import _                            from 'lodash';
import darkModeLogo                 from '../../data/images/logo-demo.svg';
import FixedIconButton              from '../../components/FixedIconButton';
import IconType                     from '../../components/Icon/IconType';
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
import React                        from 'react';
import ReactDOM                 from 'react-dom';

const Bet = ({ showPopup }) => {
          const history                           = useHistory();
          const [swiper, setSwiper]               = useState(null);
          const { eventId, betId }                = useParams();
          const [currentSlide, setCurrentSlide]   = useState(0);
          const [selectedBetId, setSelectedBetId] = useState(betId || null);
          
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
              return _.ceil(_.size(getRelatedBets()) / 2);
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
                
                  setSelectedBetId(betId);

              };
          };

          const onBetBack = () => {
            const eventId = _.get(event, '_id', null);

            history.push(Routes.getRouteWithParameters(
                Routes.bet,
                {
                    eventId,
                    betId: '',
                },
            ));

            setSelectedBetId(null);
          }

					const renderBetModal = () => {
						return (
							selectedBetId !== null ?
							ReactDOM.createPortal(                                
								<div className={styles.activeBetPopup}>
									<BetView
										closed={false}
										showEventEnd={true}
										showBackButton={true}
										onBackButtonClick={onBetBack}
									/>
								</div>,
								document.getElementById('root')
							)
							: ''
						)
					}

          const renderRelatedBetCard = (bet, index) => {
              if (bet) {
                  const betId = _.get(bet, '_id');

                  return (
                      <RelatedBetCard
                          key={index}
                          title={bet.marketQuestion}
                          onClick={onBetClick(betId)}
                          bet={bet}
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
              const firstIndex  = pageIndex * 2;
              const secondIndex = firstIndex + 1;

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
                              '[' + firstIndex + ']',
                          ),
                      )}
                      {renderRelatedBetCard(
                          _.get(
                              bets,
                              '[' + secondIndex + ']',
                          ),
                      )}
                  </div>
              );
          };

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
                                    <div>
                                        {renderRelatedBetList()}
                                    </div> 
                                    {renderBetModal()}
                                  </SwiperSlide>
                                  <SwiperSlide className={styles.carouselSlide}>
                                      <Chat
                                          event={event}
                                          className={styles.mobileChat}
                                      />
                                  </SwiperSlide>
                                  <SwiperSlide className={styles.carouselSlide}>
                                      <BetView
                                          closed={false}
                                          showEventEnd={true}
                                      />
                                  </SwiperSlide>
                              </Swiper>
                          </div>
                      </div>
                      <div className={styles.columnRight}>
                          <div>
                              <BetView
                                  closed={false}
                                  showEventEnd={true}
                              />
                          </div>
                          <div className={styles.relatedBets}>
                              <div className={styles.headline}>
                                  <h2>🚀 Related Bets</h2>
                                  <LiveBadge />
                              </div>
                              <Carousel
                                  className={styles.relatedBetsCarousel}
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
