const form = document.querySelector("form");
const imageContainer = document.querySelector("#image-container");
const loadingMessage = document.createElement("p");
loadingMessage.innerHTML = "Please wait";
loadingMessage.style.fontFamily = "heebo";
loadingMessage.style.fontSize = "20px";
loadingMessage.style.marginTop = "50px";
loadingMessage.style.textAlign = "center";

const progressBarContainer = document.createElement("div");
progressBarContainer.style.textAlign = "center";

const progressBar = document.createElement("div");
progressBar.style.width = "0%";
progressBar.style.height = "20px";
progressBar.style.backgroundColor = "#4CAF50";
progressBar.style.margin = "auto";
progressBar.style.transition = "width 1s ease-in-out";

progressBarContainer.appendChild(progressBar);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const solNumber = document.querySelector("#sol-number").value;
  const apiKey = "EtwRKhm2BiVZ22xvlmXeaYlOJGlvETLP8N1d3NvA";
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solNumber}&api_key=${apiKey}`;

  imageContainer.innerHTML = "";
  imageContainer.appendChild(loadingMessage);
  imageContainer.appendChild(progressBarContainer);

  let count = 0;
  let interval = setInterval(function () {
    count++;
    progressBar.style.width = count + "%";
    if (count >= 100) {
      clearInterval(interval);
    }
  }, 50);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      clearInterval(interval);
      if (data.photos.length === 0) {
        const errorMessage = document.createElement("p");
        errorMessage.innerHTML = "Image not found. Choose another sol please.";
        errorMessage.style.fontFamily =  "heebo";
        errorMessage.style.fontSize = "25px";
        errorMessage.style.marginTop = "50px";
        errorMessage.style.textAlign = "center";
        imageContainer.innerHTML = "";
        imageContainer.appendChild(errorMessage);
      } else {
        const image = data.photos[0].img_src;
        const img = document.createElement("img");
        img.src = image;
        imageContainer.innerHTML = "";
        imageContainer.appendChild(img);
      }
    });
});

$(document).ready(function () {
  $('#images img').each(function () {
    $(this).addClass('image-frame');
  });
});
