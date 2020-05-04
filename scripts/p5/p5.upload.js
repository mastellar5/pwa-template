p5.prototype.uploadCanvas = function() {
  p5._validateParameters('saveCanvas', arguments);

  // copy arguments to array
  const args = [].slice.call(arguments);
  let htmlCanvas, filename, extension, url;

  if (arguments[0] instanceof HTMLCanvasElement) {
    htmlCanvas = arguments[0];
    args.shift();
  } else if (arguments[0] instanceof p5.Element) {
    htmlCanvas = arguments[0].elt;
    args.shift();
  } else {
    htmlCanvas = this._curElement && this._curElement.elt;
  }

  if (args.length >= 1) {
    filename = args[0];
  }
  if (args.length >= 2) {
    extension = args[1];
  }
  if (args.length >= 3) {
    url = args[2];
  }

  extension =
    extension ||
    p5.prototype._checkFileExtension(filename, extension)[1] ||
    'png';

  let mimeType;
  switch (extension) {
    default:
      //case 'png':
      mimeType = 'image/png';
      break;
    case 'jpeg':
    case 'jpg':
      mimeType = 'image/jpeg';
      break;
  }

  if(filename  === "" || filename){
     // let name = Date.now() + ".jpg";
  }

  if(url === "" || url){

  }
  

  htmlCanvas.toBlob(blob => {
    p5.prototype.uploadFile(blob, filename, extension, mimeType, url);
  }, mimeType);
};


Blob.prototype.toFile = function(filename){
  let file = new File([this], filename, {type: this.type, lastModified: Date.now()});
  return file;
}


p5.prototype.uploadFile = function(data,fName,extension,type,location){

  if (data instanceof Blob) {
    let name = fName + "." + extension;
    let test = data.toFile(name);

    const url = location;
    
    const formData = new FormData();
    formData.append("files[]",test);

    fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => {
        console.log(response);
    });


    return;
  }
}