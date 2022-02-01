console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

document.getElementById("insta-btn").onclick = function () {
    window.open("https://www.instagram.com/__r_o_b_o_o7/");
};

document.getElementById("linkedin-btn").onclick = function () {
    window.open("https://www.linkedin.com/in/chandan-kumar-a8a50a198/");
};

document.getElementById("github-btn").onclick = function () {
    window.open("https://github.com/predator4hack");
};

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = searchElement.value;
    messageOne.textContent = "Loading ...";
    messageTwo.textContent = "";
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});
