(function() {
  "use strict";
  const countdown = document.querySelector('.countdown');
  const output = countdown.innerHTML;

  const countDownDate = function() {
    const targetDate = new Date(countdown.dataset.count);
    const offset = 6e4 * targetDate.getTimezoneOffset();
    const timeleft = targetDate.getTime() - Date.now() + offset;

    const days = ~~(timeleft / 864e5);
    const hours = ~~((timeleft % 864e5) / 36e5);
    const minutes = ~~((timeleft % 36e5) / 6e4);
    const seconds = ~~((timeleft % 6e4) / 1e3);

    countdown.innerHTML = output.replace('%d', days).replace('%h', hours).replace('%m', minutes).replace('%s', seconds);
  }
  countDownDate();
  setInterval(countDownDate, 1e3);

})()