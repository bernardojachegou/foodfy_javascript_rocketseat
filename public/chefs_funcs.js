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
  uploadLimit: 1,
  handleAvatarInput(event) {
    const { files: fileList } = event.target;
    const { uploadLimit } = AvatarUpload;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} foto`);
      event.preventDefault();
      return;
    }
  }
}