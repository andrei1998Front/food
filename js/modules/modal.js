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

export default modal;
export {closeModal, openModal};