import style from './scss/analogue-clock.scss';
/**!
 * Initial idea comes from https://codepen.io/chalda/pen/xXOKjO
 */


/**
 * Using Math.round fixes some of the jagged movements of hour and minute hands
 * @see https://stackoverflow.com/a/53416030
 * @param {number} from
 * @param {number} to
 * @returns {number}
 */
const closestEquivalentAngle = (from, to) => Math.round(from + ((((to - from) % 360) + 540) % 360) - 180);
/*
To see how this function works copy-paste the following into your browser's web console
{
  const from = 358
  const to = 3

  const s1 = to - from
  const s2 = s1 % 360
  const s3 = s2 + 540
  const s4 = s3 % 360
  const t1 = from + s4 - 180

  console.table({from, to, s1, s2, s3, s4, t1})
}
*/

function initClock() {
  const secondHand = document.getElementById('second-hand');
  const minuteHand = document.getElementById('minute-hand');
  const hourHand = document.getElementById('hour-hand');
  let prevDegreesSeconds = 0;
  let prevDegreesMinutes = 0;
  let prevDegreesHours = 0;

  setInterval(
    () => {
      const now = new Date();

      const fractionSeconds = now.getSeconds() / 60;
      const fractionMinutes = (now.getMinutes() + fractionSeconds) / 60;
      const fractionHours = (now.getHours() + fractionMinutes) / 24;

      const degreesSeconds = closestEquivalentAngle(prevDegreesSeconds, fractionSeconds * 360)
      const degreesMinutes = closestEquivalentAngle(prevDegreesMinutes, fractionMinutes * 360)
      const degreesHours = closestEquivalentAngle(prevDegreesHours, fractionHours * 360)

      secondHand.style.transform = `rotate(${degreesSeconds}deg)`;
      minuteHand.style.transform = `rotate(${degreesMinutes}deg)`;
      hourHand.style.transform = `rotate(${degreesHours}deg)`;

      prevDegreesSeconds = degreesSeconds;
      prevDegreesMinutes = degreesMinutes;
      prevDegreesHours = degreesHours;
    },
    1e3
  );
}

window.addEventListener('DOMContentLoaded', () => {
  initClock();
});
