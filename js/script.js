'use strict';

document.addEventListener('DOMContentLoaded', () => {

	// Tabs

	const tabContainer = document.querySelector('.tabheader__items'),
		  tabs = tabContainer.querySelectorAll('.tabheader__item'),
		  tabContents = document.querySelectorAll('.tabcontent');

	const hideTabs = () => {
		tabContents.forEach((item) => {
			item.classList.remove('show', 'fade');
			item.classList.add('hide');	
		});

		
		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	};
	
	const showTab = (i = 0) => {
		tabContents[i].classList.add('show', 'fade');
		tabContents[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	};
	
	hideTabs();
	showTab();

	tabContainer.addEventListener('click', (e) => {
		const trgt = e.target;

		if ( trgt && trgt.matches('.tabheader__item') ) {
		
			tabs.forEach((item, i) => {
				if (item == trgt) {
					hideTabs();
					showTab(i);
				}
			});
		}
	});

	// Timer

	const endTime = '2023-01-22';

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

	setClock('.timer', endTime);

	// Modal

	const btnModal = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalClose = modal.querySelector('[data-close]');

	btnModal.forEach((btn) => {
		btn.addEventListener('click', () => {
			modal.style.display = 'block';
		});
	});
	
	modal.addEventListener('click', (e) => {
		const target = e.target;
 
		if ( target && target.matches('[data-close]') ) {
			modal.style.display = 'none';
		}
	});
});