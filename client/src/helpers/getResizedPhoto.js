function getResizedPhoto(name, size){
    if (!name) throw new Error('The name is required as a first argument for getResizedPhoto()');
    if (!size) throw new Error('The size is required as a first argument for getResizedPhoto()');
    let nameArray = name.split('.');
    let lastPartIndex = nameArray.length-2
    nameArray[lastPartIndex] = nameArray[lastPartIndex] + '-' + size;
    return nameArray.join('.');
}

export default getResizedPhoto;