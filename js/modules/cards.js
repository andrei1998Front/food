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
}

module.exports = cards;