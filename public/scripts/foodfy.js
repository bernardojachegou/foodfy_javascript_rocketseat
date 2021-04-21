const navbarItem = document.querySelectorAll('.header__items a');

function handleHilightedNavbarItem(HtmlElement) {
  for (item of HtmlElement) {
    if (location.pathname.includes(item.getAttribute('href'))) {
      item.classList.add('header__link--active');
    }
  }
}

handleHilightedNavbarItem(navbarItem);
