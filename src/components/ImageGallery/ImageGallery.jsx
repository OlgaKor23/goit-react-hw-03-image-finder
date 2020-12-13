import React from "react";
import styles from "./ImageGallery.module.css";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, onOpenModal }) => (
  <ul className={styles.imageGallery}>
    <ImageGalleryItem images={images} onOpenModal={onOpenModal} />
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired
};

export default ImageGallery;
