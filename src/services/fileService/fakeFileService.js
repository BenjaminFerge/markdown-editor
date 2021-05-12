export function getUrl() {
    return "http://localhost:5000";
}

export function saveImage(files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        const f = files[i];
        formData.append("file", f);
    }
    return fetch(`${getUrl()}/upload/image`, {
        method: "POST",
        body: formData,
    });
}