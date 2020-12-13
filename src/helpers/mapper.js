const mapper = images => {
  return images.map(
    ({
      id: imageId,
      webformatURL: linkSmallImage,
      largeImageURL: linkLargeImage
    }) => ({
      imageId,
      linkSmallImage,
      linkLargeImage
    })
  );
};

export default mapper;
