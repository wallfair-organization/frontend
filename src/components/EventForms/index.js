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
  const [betData, setBetData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [formStep, setFormStep] = useState(step);

  const proceedEvent = ev => {
    setEventData(ev);
    setFormStep(1);
  };

  const proceedBet = (ev, back = false) => {
    setBetData(ev);
    setFormStep(back ? 0 : 2);
  };

  const proceedOutcomes = ev => {
    const betSummary = {
      description: betData.description,
      start_date: betData.start_date,
      end_date: betData.end_date,
      evidence_description: betData.evidence_description,
      evidence_source: betData.evidence_source,
      market_question: eventData.name,
      outcomes: ev.outcomes,
      slug: betData.slug,
    };

    if (bet && event) {
      const payload = {
        ...event,
        ...eventData,
        bet: {
          ...bet,
          ...betSummary,
        },
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
      const req = {
        ...eventData,
        bet: {
          ...betSummary,
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
            event={eventData || event}
            isNew={isNew}
            proceedEvent={proceedEvent}
          />
        );
      case 1:
        return (
          <BetScreen
            bet={betData || bet}
            isNew={isNew}
            proceedBet={proceedBet}
            goStepBack={goStepBack}
          />
        );
      case 2:
        return (
          <OutcomesScreen
            outcomesData={betData.outcomes || bet?.outcomes}
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

export default connect(null, mapDispatchToProps)(EventForms);
