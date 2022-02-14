// sentry中重写的settimeout，用来捕获错误
const prevSetTimeout = window.setTimeout;

window.setTimeout = function (callback, timeout) {
  const self = this;
  return prevSetTimeout(function () {
    try {
      callback.call(self);
    } catch (err) {
      // 捕获到错误并处理
      throw err;
    }
  }, timeout);
};
