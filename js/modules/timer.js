function timer(endTime, timerSelector) {

	function setZero(num) {
		return (num >= 0 && num < 10) ? `0${num}` : num;
	}

	function getTime(endTime) {
		let day, hour, minutes, seconds;
		const t = Date.parse(endTime) - Date.parse( new Date() );

		if (t <= 0) {
			day = 0;
			hour = 0;
			minutes = 0;
			seconds = 0;
		} else {
			day = Math.floor(t / (1000 * 60 * 60 * 24));
			hour = Math.floor(t / (1000 * 60 * 60)) % 24;
			minutes = Math.floor(t / (1000 * 60)) % 60;
			seconds = Math.floor(t / 1000) % 60;
		}

		return {
			'total': t,
			'days': day,
			'hour': hour,
			'minutes': minutes,
			'seconds': seconds,
		}
	}

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			interval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTime(endTime);

			days.innerHTML = setZero(t.days);
			hours.innerHTML = setZero(t.hour);
			minutes.innerHTML = setZero(t.minutes);
			seconds.innerHTML = setZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(interval);
			}
		}
	}

	setClock(timerSelector, endTime);
}

export default timer;