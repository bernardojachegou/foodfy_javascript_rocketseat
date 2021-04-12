const recipeCards = document.querySelectorAll('.card');

function handleRecipeCards(element) {
  for (let card of element) {
    card.addEventListener('click', () => {
      const recipeId = card.getAttribute('id');
      window.location.href = `/recipes/${recipeId}`;
    });
  }
}

handleRecipeCards(recipeCards);

const ImageGallery = {
  hightlight: document.querySelector('.gallery .highlight > img'),
  previews: document.querySelectorAll('.gallery-preview img'),
  setImage(event) {
    const { target } = event;

    ImageGallery.previews.forEach((preview) =>
      preview.classList.remove('active')
    );

    target.classList.add('active');

    ImageGallery.hightlight.src = target.src;
    Lightbox.image.src = target.src;
  },
};

const Lightbox = {
  target: document.querySelector('.lightbox-target'),
  image: document.querySelector('.lightbox-target img'),
  closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
  open() {
    Lightbox.target.style.opacity = 1;
    Lightbox.target.style.top = 0;
    Lightbox.target.style.bottom = 0;
    Lightbox.closeButton.style.top = 0;
  },
  close() {
    Lightbox.target.style.opacity = 0;
    Lightbox.target.style.top = '-100%';
    Lightbox.target.style.bottom = 'initial';
    Lightbox.closeButton.style.top = '-80px';
  },
};

function handleRecipeDetail(classSelected, element) {
  document.querySelector(classSelected).classList.toggle('hide');

  if (element.textContent == 'ESCONDER') {
    element.innerHTML = 'MOSTRAR';
  } else {
    element.innerHTML = 'ESCONDER';
  }
}

const ingredients = document.querySelector('#ingredients');
const ingredientContainer = document.querySelectorAll('.ingredient');
const preparations = document.querySelector('#preparation');
const preparationContainer = document.querySelectorAll('.preparation');

function handleNewIngredientOrPreparation(element, container) {
  // Realiza um clone do último ingrediente adicionado
  const newField = container[container.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == '') {
    console.log('Please, fill the container to add a new one!');
    return false;
  }

  // Deixa o valor do input vazio
  newField.children[0].value = '';
  element.appendChild(newField);
}

// function handleNewPreparation() {

//   // Realiza um clone do último ingrediente adicionado
//   const newField = preparationContainer[
//     preparationContainer.length - 1
//   ].cloneNode(true);

//   // Não adiciona um novo input se o último tem um valor vazio
//   if (newField.children[0].value == '') return false;

//   // Deixa o valor do input vazio
//   newField.children[0].value = '';
//   preparations.appendChild(newField);
// }

// document
//   .querySelector('.add-preparation')
//   .addEventListener('click', handleNewPreparation);

function handleDeleteConfirmation() {
  const confirmation = confirm('Tem certeza que deseja apagar?');
  if (!confirmation) {
    event.preventDefault();
  }
}

const PhotosUpload = {
  input: '',
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 5,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target;
    PhotosUpload.input = event.target;

    if (PhotosUpload.hasLimit(event)) return;

    Array.from(fileList).forEach((file) => {
      PhotosUpload.files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const div = PhotosUpload.getContainer(image);
        PhotosUpload.preview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },
  getAllFiles() {
    const dataTransfer =
      new ClipboardEvent('').clipboardData || new DataTransfer();

    PhotosUpload.files.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  },
  getContainer(image) {
    const div = document.createElement('div');
    div.classList.add('photo');
    div.onclick = PhotosUpload.removePhoto;

    div.appendChild(image);
    div.appendChild(PhotosUpload.getRemoveButton());

    return div;
  },
  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`);
      event.preventDefault();
      return true;
    }

    const photosDiv = [];
    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == 'photo')
        photosDiv.push(item);
    });

    const totalPhotos = fileList.length + photosDiv.length;
    if (totalPhotos > uploadLimit) {
      alert('Você atingiu o limite máximo de fotos');
      event.preventDefault();
      return true;
    }

    return false;
  },
  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = 'close';
    return button;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();

    photoDiv.remove();
  },
};
