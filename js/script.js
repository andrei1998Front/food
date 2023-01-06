'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const tabs = require(`./modules/tabs`),
		  modal = require(`./modules/modal`),
		  timer = require(`./modules/timer`),
		  slider = require(`./modules/slider`),
		  forms = require(`./modules/forms`),
		  calc = require(`./modules/calc`),
		  cards = require(`./modules/cards`);

	tabs();
	modal();
	timer();
	slider();
	forms();
	calc();
	cards();
});