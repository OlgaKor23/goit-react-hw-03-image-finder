import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import * as API from './services/api';
import Loader from './components/Loader/Loader';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isModalOpen: false,
    isLoading: false,
  };

  componentDidMount() {
    const { query, page } = this.state;
    this.onSubmit(query, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (prevState.page !== page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  openModal = modalImage => {
    this.setState({ isModalOpen: true, modalImage });
    window.addEventListener('keydown', this.closeModal);
  };

  closeModal = evt => {
    if (evt.target === evt.currentTarget || evt.keyCode === 27)
      this.setState({ isModalOpen: false });
    window.removeEventListener('keydown', this.closeModal);
  };

  onSubmit = query => {
    this.setState({ query, isLoading: true });
    API.getImages(query)
      .then(resData => {
        console.log('resData', resData);
        this.setState({ images: resData.data.hits });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  changePage = () => {
    const { query, page } = this.state;
    API.getImages(query, page + 1).then(resData => {
      this.setState(prevState => ({
        page: prevState.page + 1,
        images: [...prevState.images, ...resData.data.hits],
      }));
    });
  };

  render() {
    const { images, isModalOpen, modalImage, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} openModal={this.openModal} />
        {images.length > 0 && <Button changePage={this.changePage} />}
        {isModalOpen && (
          <Modal modalImage={modalImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
