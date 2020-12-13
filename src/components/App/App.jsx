import React, { Component } from "react";
import styles from "./App.module.css";
import * as imageApi from "../../services/image-api";
import mapper from "../../helpers/mapper";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

const INITIAL_STATE = {
  page: 1,
  images: []
};

export default class App extends Component {
  state = {
    ...INITIAL_STATE,
    query: "",
    isLoading: false,
    imgId: ""
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }

  getImages = (query, page) => {
    this.setState({ isLoading: true });

    imageApi
      .getImages(query, page)
      .then(({ data }) =>
        this.setState(prevState => ({
          images: [...prevState.images, ...mapper(data.hits)]
        }))
      )
      .catch(error => {
        console.log(error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSubmit = queryString => {
    this.setState({ ...INITIAL_STATE, query: queryString });
  };

  handleClick = () => {
    let { page } = this.state;
    page += 1;
    this.setState({ page });
  };

  handleOpenModal = id => {
    this.setState({ imgId: id });
  };

  handleCloseModal = () => {
    this.setState({ imgId: "" });
  };

  render() {
    const { images, isLoading, imgId } = this.state;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <>
            <ImageGallery images={images} onOpenModal={this.handleOpenModal} />
            <Button onClick={this.handleClick} />
          </>
        )}
        {isLoading && <Loader />}
        {imgId && (
          <Modal
            images={images}
            imgId={imgId}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
