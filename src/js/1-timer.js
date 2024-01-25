import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}

let userSelectedDate ;
const currentDate = new Date();

refs.btnStart.setAttribute('disabled', '');
refs.btnStart.addEventListener('click', onBtnStart)

function onBtnStart(event) {
  refs.btnStart.setAttribute('disabled', '');
  
  const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const lastTime = userSelectedDate - currentTime;
        const timer = convertMs(lastTime);
        const { days, hours, minutes, seconds } = timer;

        refs.days.textContent = addLeadingZero(days);
        refs.hours.textContent = addLeadingZero(hours);
        refs.minutes.textContent = addLeadingZero(minutes);
        refs.seconds.textContent = addLeadingZero(seconds);


        if (lastTime < 1000) {
          clearInterval(intervalId);
        }
  }, 1000);

}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0])
      if (selectedDates[0].getTime() < currentDate.getTime()) {
        // window.alert("Please choose a date in the future")
        iziToast.error({
          position: 'topRight',
          title: 'Error',
          message: 'Please choose a date in the future',
});
          refs.btnStart.setAttribute('disabled', '');
       } else {
         delete refs.btnStart.removeAttribute('disabled');
         userSelectedDate = selectedDates[0].getTime()
      }      
    },
};

const fp = flatpickr("#datetime-picker", options);