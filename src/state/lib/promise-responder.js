export default (dispatchResult, send) => {
  Promise
    .resolve(dispatchResult.promise)
    .then((res) => {
      send({
        error: null,
        value: res || dispatchResult
      });
    })
    .catch((err) => {
      send({
        error: err.message,
        value: null
      });
    });
};