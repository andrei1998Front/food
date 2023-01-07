/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector(`.calculating__result span`);
	let sex, height, weight, age, ratio;

	if (localStorage.getItem(`sex`)) {
		sex =  localStorage.getItem(`sex`);
	} else {
		sex = `female`;
		localStorage.setItem(`sex`, sex);
	}

	if (localStorage.getItem(`ratio`)) {
		ratio =  localStorage.getItem(`ratio`);
	} else {
		ratio = 1.375;
		localStorage.setItem(`ratio`, ratio);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(el => {
			el.classList.remove(activeClass);

			if (el.getAttribute(`id`) === localStorage.getItem(`sex`)) {
				el.classList.add(activeClass);
			}

			if (el.getAttribute(`data-ratio`) === localStorage.getItem(`ratio`)) {
				el.classList.add(activeClass);
			}
		});
	}

	initLocalSettings(`#gender div`, `calculating__choose-item_active`);
	initLocalSettings(`.calculating__choose_big div`,`calculating__choose-item_active`);

	function calcTotal() {
		if (!sex || !height || !weight || !age) {
			result.textContent = `_____`;
			return;
		}
		const female = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);

		const male = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);

		if (isNaN(male) || isNaN(female)) {
			result.textContent = `_____`;
			return;
		} else {
			result.textContent = (sex === `female`) ? female : male;	
		}
	}

	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((el) => {
			el.addEventListener(`click`, (e) => {
				if (e.target.getAttribute(`data-ratio`)) {
					ratio = +e.target.getAttribute(`data-ratio`);
					localStorage.setItem(`ratio`, ratio);
				} else {
					sex = e.target.getAttribute(`id`);
					localStorage.setItem(`sex`, sex);
				}

				elements.forEach((el) => {
					el.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);

				calcTotal();
			});
		});
	}

	getStaticInformation(`#gender div`, `calculating__choose-item_active`);
	getStaticInformation(`.calculating__choose_big div`,`calculating__choose-item_active`);

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener(`input`, (e) => {
			const value = e.target.value;
			
			if (value.match(/\D/)) {
				e.target.style.border = `1px solid red`;
			} else {
				e.target.style.border = `none`;	
			}

			switch (e.target.getAttribute(`id`)) {
				case `height`:
					height = value;
					break;

				case `weight`:
					weight = value;
					break;

				case `age`:
					age = value;
					break;
			}

			calcTotal();
		});
	}

	getDynamicInformation(`#height`);
	getDynamicInformation(`#weight`);
	getDynamicInformation(`#age`);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");


function cards() {
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

	(0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getResource)(`http://localhost:3000/menu`)
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg,
							title, descr, price,
							`.menu__field .container`)
							.render();
			});
		});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector),
		messages = {
			loading: 'img/form/spinner.svg',
			success: 'Спасибо! Мы свяжемся с Вами в близжайшее время!',
			failure: 'Что-то пошло не так...',
		};

	forms.forEach((form) => bindSendingForms(form));


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

			(0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.sendingForms)('http://localhost:3000/requests', json)
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
		(0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
			(0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 4000);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');

	document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');

	document.body.style.overflow = 'hidden';
	
	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function modal(triggerSelector, modalSelector, modalTimerId) {

	const btnModal = document.querySelectorAll(triggerSelector), 
		modal = document.querySelector(modalSelector);

	btnModal.forEach((btn) => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});
	
	modal.addEventListener('click', (e) => {
		const target = e.target;
 
		if ( target && target.matches('[data-close]') ) {
			closeModal(modalSelector);
		} else if (target === modal) {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code == 'Escape' && modal.matches('.show')) {
			closeModal(modalSelector);
		}
	});

	function openModalFromScroll() {
		// текущая прокрутка + размер окна просмотра - 1 пиксель для дебага
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight  - 1) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', openModalFromScroll);
		}
	}

	// модальное окно в конце страницы
	window.addEventListener('scroll', openModalFromScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow,
				prevArrow, totalCounter, currentCounter,
				wrapper, field}) {
    const slides = document.querySelectorAll(slide),
		  slider = document.querySelector(container),
		  prev = document.querySelector(prevArrow),
		  next = document.querySelector(nextArrow),
		  current = document.querySelector(currentCounter),
		  total = document.querySelector(totalCounter),
		  sliderWrapper = document.querySelector(wrapper),
		  sliderField = document.querySelector(field),
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

	const tabContainer = document.querySelector(tabsParentSelector),
          tabs = tabContainer.querySelectorAll(tabsSelector),
          tabContents = document.querySelectorAll(tabsContentSelector);

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
        tabs[i].classList.add(activeClass);
    };

    hideTabs();
    showTab();

    tabContainer.addEventListener('click', (e) => {
        const trgt = e.target;

        if ( trgt && trgt.matches(tabsSelector) ) {
        
            tabs.forEach((item, i) => {
                if (item == trgt) {
                    hideTabs();
                    showTab(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "sendingForms": () => (/* binding */ sendingForms)
/* harmony export */ });
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

const getResource = async (url, data) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json(); 
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms.js */ "./js/modules/forms.js");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js");











document.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(() => {(0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId)}, 30000);

	(0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	(0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
	(0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_2__["default"])('2023-01-22', '.timer');
	(0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
		container: `.offer__slider`,
		slide: `.offer__slide`,
		nextArrow: `.offer__slider-next`,
		prevArrow: `.offer__slider-prev`,
		totalCounter: `#total`,
		currentCounter: `#current`,
		wrapper: `.offer__slider-wrapper`,
		field: `.offer__slider-inner`,
	});
	(0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
	(0,_modules_calc_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
	(0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map