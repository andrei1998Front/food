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

export default tabs;