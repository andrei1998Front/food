function slider() {
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
}

module.exports = slider;