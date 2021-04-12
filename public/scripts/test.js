function handleNewPreparation() {
  const preparations = document.querySelector('#preparation');
  const preparationContainer = document.querySelectorAll('.preparation');
  // Realiza um clone do último ingrediente adicionado
  const newField = preparationContainer[
    preparationContainer.length - 1
  ].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == '') return false;

  // Deixa o valor do input vazio
  newField.children[0].value = '';
  preparations.appendChild(newField);
}

const ingredients = document.querySelector('#ingredients');
const ingredientContainer = document.querySelectorAll('.ingredient');