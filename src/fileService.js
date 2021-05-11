import { myLocalStorage as storage } from "./storageHelper";

const imgPrefix = "img/";

function getImageDataURL(file, cb) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        const { error, result } = reader;
        cb(error, result);
    }, false);
    reader.readAsDataURL(file);
}

export function saveImage(file) {
    console.log("Saving image...", file.name);
    getImageDataURL(file, (err, data) => {
        if (err) {
            throw new Error(err);
        }
        storage.store(imgPrefix + file.name, data);
    });
}