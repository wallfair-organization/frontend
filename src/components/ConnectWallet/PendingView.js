const PendingView = ({ error, setPendingError, tryActivation, connector }) => {
  return <div>{error ? <span>ERROR</span> : <span>Loading...</span>}</div>;
};

export default PendingView;
