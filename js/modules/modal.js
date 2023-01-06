function modal() {
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
}

module.exports = modal;