import React, { Component } from 'react';
import Searchbar from './SearchBar/SearchBar';
import { getPictures } from 'services/api';
import { mapper } from './helpers/Mapper';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    isShow: false,
    page: 1,
    images: [],
    pictureName: '',
    isLoading: false,
    showModal: false,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, pictureName } = this.state;
    if (prevState.pictureName !== pictureName || prevState.page !== page) {
      this.fetchPictures(page, pictureName);
    }
    if (prevState.pictureName !== pictureName) {
      this.setState({ images: [] });
    }
  }

  fetchPictures = (page, pictureName) => {
    this.setState({ isLoading: true });
    getPictures(page, pictureName)
      .then(({ data }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...mapper(data.hits)],
          isLoading: false,
          isShow: true,
        }));
        if (data.totalHits === 0) {
          toast.error('There is no pictures!');
        }
        if (data.hits.length < 12 && data.totalHits !== 0) {
          toast.info('This is the end of collection!');
          this.setState({ isShow: false });
        }
      })
      .catch(error => console.log(error));
  };

  onSearch = pictureName => {
    if (pictureName) {
      this.setState({ pictureName });
    } else toast.warn('Please, enter the picture name!');
  };

  onloadMore = () => {
    let { page } = this.state;
    page += 1;
    this.setState({ page });
  };

  openModal = e => {
    this.setState({ showModal: true, largeImageURL: e.currentTarget.srcset });
  };
  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: null });
  };

  render() {
    const { onSearch, onloadMore, openModal, closeModal } = this;
    const { images, isLoading, showModal, largeImageURL, isShow } = this.state;
    return (
      <>
        <Searchbar onSubmit={onSearch} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {(isLoading && <Loader />) ||
          (images.length > 0 && isShow && <Button onLoadMore={onloadMore} />)}

        {showModal && (
          <Modal closeModal={closeModal} largeImageURL={largeImageURL} />
        )}
        <ToastContainer />
      </>
    );
  }
}
