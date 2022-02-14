import { useState } from 'react';
import { useHistory } from 'react-router';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import BetScreen from './BetScreen';
import { EventActions } from 'store/actions/event';
import { createMarketEvent, editMarketEvent } from 'api';
import EventScreen from './EventScreen';
import OutcomesScreen from './OutcomesScreen';
import { BetActions } from 'store/actions/bet';

const EventForms = ({
  event = null,
  bet = null,
  step = 0,
  createEventSuccess,
  createEventFail,
  editEventSuccess,
  editEventFail,
  editBet,
}) => {
  const history = useHistory();

  const isNew = !(event || bet);
  const [betData, setBetData] = useState({});
  const [eventData, setEventData] = useState({});
  const [formStep, setFormStep] = useState(step);

  const proceedEvent = ev => {
    setEventData(ev);

    if (event) {
      const payload = {
        ...event,
        ...ev,
      };

      editMarketEvent(event.id, payload)
        .then(res => {
          history.push(
            Routes.getRouteWithParameters(Routes.event, {
              eventSlug: res.slug,
            })
          );
          editEventSuccess();
        })
        .catch(() => {
          editEventFail();
        });
    } else {
      setFormStep(1);
    }
  };

  const proceedBet = (ev, back = false) => {
    setBetData(ev);
    setFormStep(back ? 0 : 2);
  };

  const proceedOutcomes = ev => {
    const payload = {
      description: betData.description,
      end_date: betData.end_date,
      evidence_description: betData.evidence_description,
      evidence_source: betData.evidence_source,
      market_question: betData.market_question,
      outcomes: ev.outcomes,
      slug: betData.slug,
    };

    if (bet) {
      editBet({ betId: bet.id, bet: payload });
    } else {
      const req = {
        ...eventData,
        bet: {
          ...payload,
          start_date: eventData.date,
          liquidity: betData.liquidity,
        },
      };

      createMarketEvent(req)
        .then(res => {
          history.push(
            Routes.getRouteWithParameters(Routes.event, {
              eventSlug: res.slug,
            })
          );
          createEventSuccess();
        })
        .catch(() => {
          createEventFail();
        });
    }
  };

  const goStepBack = () => {
    setFormStep(formStep - 1);
  };

  const renderStep = () => {
    switch (formStep) {
      case 0:
        return (
            <EventScreen
              event={event || eventData}
              isNew={isNew}
              proceedEvent={proceedEvent}
            />
        );
      case 1:
        return (
            <BetScreen
              bet={bet || betData}
              isNew={isNew}
              proceedBet={proceedBet}
              goStepBack={goStepBack}
            />
        );
      case 2:
        return (
          <OutcomesScreen
            outcomesData={bet?.outcomes || betData.outcomes}
            isNew={isNew}
            proceedOutcomes={proceedOutcomes}
            goStepBack={goStepBack}
          />
        );
    }
  };

  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.formColumn}>{renderStep()}</div>

        {/* <div className={styles.previewColumn}>renderPreview</div> */}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    eventSlugs: state.event.events.map(({ slug }) => slug).filter(Boolean),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEventSuccess: () => {
      dispatch(EventActions.createEventSuccess());
    },
    createEventFail: () => {
      dispatch(EventActions.createEventFail());
    },
    editEventSuccess: () => {
      dispatch(EventActions.editEventSuccess());
    },
    editEventFail: () => {
      dispatch(EventActions.editEventFail());
    },
    editBet: payload => {
      dispatch(BetActions.edit(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForms);
