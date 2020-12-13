const findImg = (images, id) => {
  return images.find(({ imageId }) => imageId === id);
};
export default findImg;
