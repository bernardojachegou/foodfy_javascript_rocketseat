const currentPage = location.pathname;
const menuItems = document.querySelectorAll(".menu_items a");

for (item of menuItems) {
	if (currentPage.includes(item.getAttribute("href"))) {
		item.classList.add("active");
	}
}

const recipeCards = document.querySelectorAll('.card');

function handleRecipeCards(element) {
	for (let card of element) {
		card.addEventListener("click", () => {
			const recipeId = card.getAttribute("id");
			window.location.href = `/receitas/${recipeId}`
		});
	}
}

handleRecipeCards(recipeCards);


