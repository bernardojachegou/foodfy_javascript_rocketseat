const cards = document.querySelectorAll(".card");
const button = document.querySelector(".button");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");

// const buttons = document.querySelectorAll(".button");

for (let card of cards) {
    card.addEventListener("click", () => {
        const recipeId = card.getAttribute("id");
        window.location.href = `/receitas/${recipeId}`
    });
}

button.addEventListener("click", () => {
    if (button.innerHTML == "MOSTRAR") {
        button.innerHTML = "ESCONDER";
        document.querySelector(".list").classList.remove("hide");
    } else {
        button.innerHTML = "MOSTRAR";
        document.querySelector(".list").classList.add("hide");
    }
});

button1.addEventListener("click", () => {
    if (button1.innerHTML == "MOSTRAR") {
        button1.innerHTML = "ESCONDER";
        document.querySelector(".list1").classList.remove("hide");
    } else {
        button1.innerHTML = "MOSTRAR";
        document.querySelector(".list1").classList.add("hide");
    }
});

button2.addEventListener("click", () => {
    if (button2.innerHTML == "MOSTRAR") {
        button2.innerHTML = "ESCONDER";
        document.querySelector(".list2").classList.remove("hide");
    } else {
        button2.innerHTML = "MOSTRAR";
        document.querySelector(".list2").classList.add("hide");
    }
});

// for (let button of buttons) {
//     button.addEventListener("click", () => {
//         if (button.innerHTML == "MOSTRAR") {
//             button.innerHTML = "ESCONDER";
//             document.querySelector(".list").classList.remove("hide");
//         } else {
//             button.innerHTML = "MOSTRAR";
//             document.querySelector(".list").classList.add("hide");
//         }
//     });
// }
