import Searchbar from './SearchBar/SearchBar';
import { getPictures } from 'services/api';
import { mapper } from './helpers/Mapper';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

export function App() {
  const [isShow, setIsShow] = useState(false);
  const [page, setPage] = useState(1);
  const [pictureName, setPictureName] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState(null);

  useEffect(() => {
    if (!pictureName) {
      return;
    }
    fetchPictures(page, pictureName);
  }, [pictureName, page]);

  const fetchPictures = (page, pictureName) => {
    setIsLoading(true);
    getPictures(page, pictureName)
      .then(({ data }) => {
        setImages(prevImages => [...prevImages, ...mapper(data.hits)]);
        setIsLoading(false);
        setIsShow(true);
        if (data.totalHits === 0) {
          toast.error('There is no pictures!');
          setIsShow(false);
        }
        if (data.hits.length < 12 && data.totalHits !== 0) {
          toast.info('This is the end of collection!');
          setIsShow(false);
        }
      })
      .catch(error => console.log(error));
  };

  const onSearch = pictureName => {
    setPictureName(pictureName);
    setImages([]);
    setPage(1);
  };

  const onloadMore = () => {
    const nextPage = page + 1;

    setPage(nextPage);
  };

  const openModal = e => {
    setShowModal(true);
    setLargeImgURL(e.currentTarget.srcset);
  };
  const closeModal = () => {
    setShowModal(false);
    setLargeImgURL(null);
  };

  return (
    <>
      <Searchbar onSubmit={onSearch} />
      {images && <ImageGallery images={images} openModal={openModal} />}
      {(isLoading && <Loader />) ||
        (images && isShow && <Button onLoadMore={onloadMore} />)}

      {showModal && (
        <Modal closeModal={closeModal} largeImageURL={largeImgURL} />
      )}
      <ToastContainer />
    </>
  );
}
