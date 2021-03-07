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

const AvatarUpload = {
  input: "",
  preview: document.querySelector('#avatar-preview'),
  uploadLimit: 1,
  files: [],
  handleAvatarInput(event) {
    const { files: fileList } = event.target;
    AvatarUpload.input = event.target;

    if (AvatarUpload.hasLimit(event)) return;

    Array.from(fileList).forEach(file => {

      AvatarUpload.files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const div = AvatarUpload.createContainer(image);
        AvatarUpload.preview.appendChild(div);

      }

      reader.readAsDataURL(file);
    })

    AvatarUpload.input.files = AvatarUpload.getAllFiles();
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

    AvatarUpload.files.forEach(file => dataTransfer.items.add(file));

    return dataTransfer.files;
  },
  createContainer(image) {
    const div = document.createElement('div');
    div.classList.add('avatar');
    div.onclick = AvatarUpload.removePhoto;

    div.appendChild(image);
    div.appendChild(AvatarUpload.getRemoveButton());

    return div;
  },
  hasLimit(event) {
    const { uploadLimit, input, preview } = AvatarUpload;
    const { files: fileList } = input;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} foto`);
      event.preventDefault();
      return true;
    }

    const photosDiv = [];
    preview.childNodes.forEach(item => {
      if (item.classList && item.classList.value == "avatar")
        photosDiv.push(item);
    })

    const totalPhotos = fileList.length + photosDiv.length;
    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite máximo de fotos")
      event.preventDefault();
      return true;
    }

    return false;
  },
  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = "close";
    return button;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(AvatarUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);

    AvatarUpload.files.splice(index, 1);
    AvatarUpload.input.files = AvatarUpload.getAllFiles();

    photoDiv.remove();
  }
}