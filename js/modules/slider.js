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

export default slider;