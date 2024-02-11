export const getIdURL = (url) => {
  var getId = url.substring(url.lastIndexOf("/") + 1);

  if (!isNaN(getId) && getId.trim() !== "") {
    return getId;
  }
  return null;
};
