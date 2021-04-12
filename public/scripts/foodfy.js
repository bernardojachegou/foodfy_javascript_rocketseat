const adminNavbarItems = document.querySelectorAll('.admin-navbar-items a');

function handleHilightedNavbarItem(HtmlElement) {
  for (item of HtmlElement) {
    if (location.pathname.includes(item.getAttribute('href'))) {
      item.classList.add('active');
    }
  }
}

handleHilightedNavbarItem(adminNavbarItems);
