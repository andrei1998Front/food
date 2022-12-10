'use strict';

document.addEventListener('DOMContentLoaded', () => {

	const tabContainer = document.querySelector('.tabheader__items'),
		  tabs = tabContainer.querySelectorAll('.tabheader__item'),
		  tabContents = document.querySelectorAll('.tabcontent');

		  console.log(tabs);

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
});