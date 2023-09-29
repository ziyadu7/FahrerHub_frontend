const isValidImage = (file) => {
    const acceptedImageTypes = ["image/jpeg", "image/jpg", "image/avif", "image/png", "image/gif", "image/webp"]
    return acceptedImageTypes.includes(file.type);
}

export default isValidImage