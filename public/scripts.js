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

const chefCards = document.querySelectorAll('.chef-card');

function handleChefCards(element) {
    for (let card of element) {
        card.addEventListener("click", () => {
            const chefId = card.getAttribute("id");
            window.location.href = `/chefs/${chefId}`
        });
    }
}

handleChefCards(chefCards);

function handleRecipeDetail(classSelected, element) {
    document.querySelector(classSelected).classList.toggle('hide')

    if (element.textContent == 'ESCONDER') {
        element.innerHTML = 'MOSTRAR'
    } else {
        element.innerHTML = 'ESCONDER'
    }
}

function handleNewIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const ingredientContainer = document.querySelectorAll(".ingredient");
    // Realiza um clone do último ingrediente adicionado
    const newField = ingredientContainer[ingredientContainer.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

document
    .querySelector(".add-ingredient")
    .addEventListener("click", handleNewIngredient);

function handleNewPreparation() {
    const preparations = document.querySelector("#preparation");
    const preparationContainer = document.querySelectorAll(".preparation");
    // Realiza um clone do último ingrediente adicionado
    const newField = preparationContainer[preparationContainer.length - 1].cloneNode(true);

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;

    // Deixa o valor do input vazio
    newField.children[0].value = "";
    preparations.appendChild(newField);
}

document
    .querySelector(".add-preparation")
    .addEventListener("click", handleNewPreparation);

function handleDeleteConfirmation() {
    const confirmation = confirm("Tem certeza que deseja apagar?");
    if (!confirmation) {
        event.preventDefault();
    }
}


