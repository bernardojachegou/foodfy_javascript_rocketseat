const currentPage = location.pathname;
const menuItems = document.querySelectorAll(".menu_items a");

for (item of menuItems) {
	if (currentPage.includes(item.getAttribute("href"))) {
		item.classList.add("active");
	}
}


