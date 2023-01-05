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

	function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

	function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

	const btnModal = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	btnModal.forEach((btn) => {
		btn.addEventListener('click', () => {
			openModal();
		});
	});
	
	modal.addEventListener('click', (e) => {
		const target = e.target;
 
		if ( target && target.matches('[data-close]') ) {
			closeModal();
		} else if (target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code == 'Escape' && modal.matches('.show')) {
			closeModal();
		}
	});

	const modalTimer = setTimeout(() => {openModal(modal)}, 30000);

	function openModalFromScroll() {
		// текущая прокрутка + размер окна просмотра - 1 пиксель для дебага
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight  - 1) {
			openModal();
			window.removeEventListener('scroll', openModalFromScroll);
		}
	}

	// модальное окно в конце страницы
	window.addEventListener('scroll', openModalFromScroll);

	class MenuCard {
		constructor(src, alt, title, descr,
					price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.transfer = 27;
			this.parent = document.querySelector(parentSelector);
			this.convertToUAH();
		}

		convertToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const elem = document.createElement('div');

			if (this.classes.length == 0) {
				this.classes.push('menu__item');
			}

			this.classes.forEach((className) => elem.classList.add(className));
			elem.innerHTML = `
					<img src="${this.src}" alt="${this.alt}">
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>`;

			this.parent.append(elem);
		}
	}

	const getResource = async (url, data) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}

		return await res.json(); 
	};

	getResource(`http://localhost:3000/menu`)
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg,
							title, descr, price,
							`.menu__field .container`)
							.render();
			});
		});

	// axios.get(`http://localhost:3000/menu`)
	// .then(data => {
	// 	data.data.forEach(({img, altimg, title, descr, price}) => {
	// 		new MenuCard(img, altimg,
	// 					title, descr, price,
	// 					`.menu__field .container`)
	// 					.render();
	// 	});
	// });

	// Forms

	const forms = document.querySelectorAll('form'),
		messages = {
			loading: 'img/form/spinner.svg',
			success: 'Спасибо! Мы свяжемся с Вами в близжайшее время!',
			failure: 'Что-то пошло не так...',
		};

	forms.forEach((form) => bindSendingForms(form));

	const sendingForms = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: data,
		});

		return await res.json(); 
	};

	function bindSendingForms(form) {

		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = messages.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			
			form.insertAdjacentElement('beforeend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			sendingForms('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(messages.success);
				statusMessage.remove();
			})
			.catch(() => {
				showThanksModal(messages.failure);
				statusMessage.remove();
			})
			.finally(() => {
				form.reset();
			});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');

		thanksModal.innerHTML = `
			<div class="modal__dialog">
				<div class="modal__content">
					<div data-close class="modal__close">&times;</div>
					<div class="modal__title">${message}</div>
				</div>
			</div>
			`;
		
		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	//Slider

	const slides = document.querySelectorAll(`.offer__slide`),
		  slider = document.querySelector(`.offer__slider`),
		  prev = document.querySelector(`.offer__slider-prev`),
		  next = document.querySelector(`.offer__slider-next`),
		  current = document.querySelector(`#current`),
		  total = document.querySelector(`#total`),
		  sliderWrapper = document.querySelector(`.offer__slider-wrapper`),
		  sliderField = document.querySelector(`.offer__slider-inner`),
		  width = window.getComputedStyle(sliderWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	total.textContent = (slides.length < 10) ? `0${slides.length}` : slides.length;
	current.textContent = (slideIndex < 10) ? `0${slideIndex}` : slideIndex;

	sliderField.style.width = `${100 * slides.length}%`;
	sliderField.style.display = 'flex';
	sliderField.style.transition = '0.5s all';
	sliderWrapper.style.overflow = 'hidden';

	slider.style.position = `relative`;

	const dots = document.createElement(`ol`);
	dots.classList.add(`carousel-indicators`);
	slider.append(dots);

	slides.forEach((slide, i) => {
		slide.style.width = width;

		const dot = document.createElement(`li`);
		dot.classList.add(`dot`);

		dot.setAttribute(`data-dotNum`, i);

		dots.append(dot);
	});

	function addActive(arr, i) {
		arr[i - 1].classList.add(`dot_active`);
	}

	function removeActive(arr) {
		arr.forEach(dot => {
			if (dot.matches(`.dot_active`)) {
				dot.classList.remove(`dot_active`);
			}
		});
	}

	function checkCurrent(arr, current) {
		if (arr.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function toggleSlide(field, offset) {
		field.style.transform = `translateX(-${offset}px)`;
	}

	function getValue(v) {
		return +v.replace(/\D/g, '');
	}
 	
	const dotArr = document.querySelectorAll(`.dot`);

	dotArr[slideIndex - 1].classList.add(`dot_active`);

	dotArr.forEach(dot => {
		dot.addEventListener(`click`, (e) => {
			const dotNum = +e.target.getAttribute(`data-dotNum`);

			const offset = getValue(width) * dotNum;
			toggleSlide(sliderField, offset)

			slideIndex = dotNum + 1;
			checkCurrent(slides, current)

			removeActive(dotArr);
			e.target.classList.add(`dot_active`);
		});
	});

	next.addEventListener('click', () => {
		if (offset == getValue(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += getValue(width);
		}
		
		toggleSlide(sliderField, offset)

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		checkCurrent(slides, current);

		removeActive(dotArr);
		addActive(dotArr, slideIndex);
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = getValue(width) * (slides.length - 1);
		} else {
			offset -= getValue(width);
		}

		toggleSlide(sliderField, offset)

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		checkCurrent(slides, current);

		removeActive(dotArr);
		addActive(dotArr, slideIndex);
	});
});