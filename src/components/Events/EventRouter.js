import EventTypes from 'constants/EventTypes';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Bet from 'screens/Bet';
import BetVTwo from 'screens/BetVTwo';

const EventRouter = ({ events, ...props }) => {
  const { eventSlug } = useParams();
  const [event, setEvent] = useState(null);
  const eventType = _.get(event, 'type');

  const isNonStreamed = eventType === EventTypes.nonStreamed;

  useEffect(() => {
    const sluggedEvent = _.find(events, {
      slug: eventSlug,
    });

    if (!_.isEqual(sluggedEvent, event)) {
      setEvent(sluggedEvent);
    }
  }, [events, eventSlug]);

  return isNonStreamed ? <BetVTwo /> : <Bet />;
};

const mapStateToProps = state => {
  return {
    events: state.event.events,
  };
};

export default connect(mapStateToProps, null)(EventRouter);
