function forms() {
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
}

module.exports = forms;