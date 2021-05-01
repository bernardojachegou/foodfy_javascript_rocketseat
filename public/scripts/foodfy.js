const navbarItem = document.querySelectorAll('.header__items a');
const adminNavbarItem = document.querySelectorAll('.header__adminItems a');
const navbarTag = 'header__link--active';
const adminNavbarTag = 'header__link--adminActive';

function handleHilightedNavbarItem(HtmlElement, tag) {
  for (item of HtmlElement) {
    if (location.pathname.includes(item.getAttribute('href'))) {
      item.classList.add(tag);
    }
  }
}

handleHilightedNavbarItem(navbarItem, navbarTag);
handleHilightedNavbarItem(adminNavbarItem, adminNavbarTag);
