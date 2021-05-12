function getImageDataURL(file, cb) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        const { error, result } = reader;
        cb(error, result);
    }, false);
    reader.readAsDataURL(file);
}

export function saveImage(file) {
    return new Promise((resolve, reject) => {
        getImageDataURL(file, (err, data) => {
            if (err)
                reject(err);
            myLocalStorage.store(file.name, data);
            resolve({ key: file.name, data });
        });
    });
}