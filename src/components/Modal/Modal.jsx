import React, { Component } from "react";
import styles from "./Modal.module.css";
import findImg from "../../helpers/findImg";
import PropTypes from "prop-types";

export default class Modal extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        imageId: PropTypes.number.isRequired,
        linkSmallImage: PropTypes.string.isRequired
      })
    ).isRequired,
    imgId: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleCloseModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleCloseModalByEscape);
  }

  handleCloseModalByEscape = ({ keyCode }) => {
    if (keyCode === 27) {
      this.props.onCloseModal();
    }
  };
  render() {
    const { images, imgId, onCloseModal } = this.props;
    const { linkLargeImage } = findImg(images, +imgId);
    return (
      <div className={styles.overlay}>
        <div className={styles.modal} onClick={onCloseModal}>
          <img src={linkLargeImage} alt="" />
        </div>
      </div>
    );
  }
}
