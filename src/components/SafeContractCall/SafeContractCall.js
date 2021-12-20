const SafeCall = ({ tx, callback, setter }) => {
  setter(tx.hash);
  var success = false;
  tx.wait()
    .catch(err => {
      // receiving receipt
      setter('Tx Failed');
      success = false;
      console.error(err);
    })
    .then(() => {
      success = true;
      setter(tx.hash);
    })
    .finally(() => {
      setter('');
      callback(success);
    });
};

export default SafeCall;
