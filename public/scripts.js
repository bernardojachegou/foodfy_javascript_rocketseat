const cards = document.querySelectorAll(".card");

for (let card of cards) {
    card.addEventListener("click", () => {
        const recipeId = card.getAttribute("id");
        window.location.href = `/receitas/${recipeId}`
    });
}

function handleRecipeDetail(classSelected, element) {
    document.querySelector(classSelected).classList.toggle('hide')

    if (element.textContent == 'ESCONDER') {
        element.innerHTML = 'MOSTRAR'
    } else {
        element.innerHTML = 'ESCONDER'
    }
}


