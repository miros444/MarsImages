const form = document.querySelector("form");
const imageContainer = document.querySelector("#image-container");
const loadingMessage = document.createElement("p");
loadingMessage.innerHTML = "Please wait";
loadingMessage.style.fontFamily = "coolFont";
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
      const image = data.photos[0].img_src;
      const img = document.createElement("img");
      img.src = image;
      imageContainer.innerHTML = "";
      imageContainer.appendChild(img);
    });
});






/* EtwRKhm2BiVZ22xvlmXeaYlOJGlvETLP8N1d3NvA */














