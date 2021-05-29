function checkIfIsImage(extension){
    if (extension === "png" || extension === "jpg" || extension === "jpeg" || extension === "gif" ){
        return true;
    }
    return false;
}

module.exports = checkIfIsImage;