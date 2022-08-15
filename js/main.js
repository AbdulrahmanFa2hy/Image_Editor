let saturate = document.getElementById("saturate"),
  contrast = document.getElementById("contrast"),
  brightness = document.getElementById("brightness"),
  sepia = document.getElementById("sepia"),
  grayscale = document.getElementById("grayscale"),
  blur = document.getElementById("blur"),
  hueRotate = document.getElementById("hue-rotate"),
  upload = document.getElementById("upload"),
  download = document.getElementById("download"),
  img = document.getElementById("img"),
  reset = document.querySelector("span"),
  imgBox = document.querySelector(".img-box"),
  canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = function () {
  resetFilters();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("click", function () {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

function resetFilters() {
  img.style.filter = "";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}

download.onclick = function () {
  download.href = canvas.toDataURL();
};
