import React, { Component } from "react";
import styles from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

export default class ImageGalleryItem extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        imageId: PropTypes.number.isRequired,
        linkSmallImage: PropTypes.string.isRequired
      })
    ).isRequired,
    onOpenModal: PropTypes.func.isRequired
  };

  handlePassId = ({ target: { id } }) => {
    const { onOpenModal } = this.props;
    onOpenModal(id);
  };

  render() {
    const { images } = this.props;
    return (
      <>
        {images.map(({ imageId, linkSmallImage }) => (
          <li
            key={imageId}
            className={styles.imageGalleryItem}
            onClick={this.handlePassId}
          >
            <img
              id={imageId}
              src={linkSmallImage}
              alt="Query result"
              className={styles.imageGalleryItemImage}
            />
          </li>
        ))}
      </>
    );
  }
}
