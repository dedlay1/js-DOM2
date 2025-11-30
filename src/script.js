const gallery = document.getElementById("gallery");

let galleryData = [];
let currentIndex = 0;

// ---- GET request to API ----
async function getImages() {
    const url = "https://picsum.photos/v2/list?page=1&limit=100";
    const response = await fetch(url);
    return await response.json();
}

// ---- Initial load: first 4 images ----
async function loadInitialImages() {
    galleryData = await getImages();
    addImagesToGallery(4);
}

function addImagesToGallery(count) {
    for (let i = 0; i < count; i++) {
        if (currentIndex >= galleryData.length) return;

        const imgObj = galleryData[currentIndex];
        const img = document.createElement("img");
        img.src = imgObj.download_url;
        img.alt = imgObj.author;
        img.classList.add("photo");

        gallery.appendChild(img);
        currentIndex++;
    }
}

// ---- Buttons ----
document.getElementById("loadMore").onclick = () => addImagesToGallery(4);

document.getElementById("clearGallery").onclick = () => {
    gallery.innerHTML = "";
    currentIndex = 0;
};

document.getElementById("removeLast").onclick = () => {
    if (gallery.lastChild) gallery.removeChild(gallery.lastChild);
};

document.getElementById("reverseGallery").onclick = () => {
    let items = Array.from(gallery.children).reverse();
    gallery.innerHTML = "";
    items.forEach(item => gallery.appendChild(item));
};

document.getElementById("shuffleGallery").onclick = () => {
    let items = Array.from(gallery.children);
    items.sort(() => Math.random() - 0.5);
    gallery.innerHTML = "";
    items.forEach(item => gallery.appendChild(item));
};

// ---- Start ----
loadInitialImages();
