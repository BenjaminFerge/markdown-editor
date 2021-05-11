import { myLocalStorage as storage } from "./storageHelper";

function getImageDataURL(file, cb) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        const { error, result } = reader;
        cb(error, result);
    }, false);
    reader.readAsDataURL(file);
}

export function saveImage(file, cb) {
    console.log("Saving image...", file.name);
    getImageDataURL(file, (err, data) => {
        cb(err, data);
    });
}