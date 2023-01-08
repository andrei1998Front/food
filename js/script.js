'use strict';
require('es6-promise').polyfill();
// import '../nodelist-foreach-polyfill';

import tabs from './modules/tabs.js';
import modal from './modules/modal.js';
import timer from './modules/timer.js';
import slider from './modules/slider.js';
import forms from './modules/forms.js';
import calc from './modules/calc.js';
import cards from './modules/cards.js';
import {openModal} from './modules/modal.js';

document.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(() => {openModal('.modal', modalTimerId)}, 30000);

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerId);
	timer('2023-01-22', '.timer');
	slider({
		container: `.offer__slider`,
		slide: `.offer__slide`,
		nextArrow: `.offer__slider-next`,
		prevArrow: `.offer__slider-prev`,
		totalCounter: `#total`,
		currentCounter: `#current`,
		wrapper: `.offer__slider-wrapper`,
		field: `.offer__slider-inner`,
	});
	forms('form', modalTimerId);
	calc();
	cards();
});