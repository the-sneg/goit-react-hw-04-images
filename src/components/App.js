import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import * as Scroll from 'react-scroll';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { FetchData } from '../services/Api';

const perPage = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!value) {
      return;
    }
    setLoading(true);
    FetchData(value, page, perPage)
      .then(data => {
        setImages(prevState => [...prevState, ...data.hits]);
        setLoading(false);
        if (data.total > perPage) {
          setShowLoadMore(true);
        } else if (data.total <= page * perPage) {
          setShowLoadMore(false);
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      })
      .catch(onApiError);
  }, [page, value]);

  const onSearch = inputValue => {
    setValue(inputValue);
    setPage(1);
    setImages([]);
    setShowLoadMore(false);
    setLoading(true);
  };

  const onApiError = () => {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    setLoading(false);
    setShowLoadMore(false);
  };

  const showMore = () => {
    setPage(prevState => prevState + 1);
    scrollSlowly();
  };

  const openModal = image => {
    setShowModal(true);
    setLargeImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const scrollSlowly = () => {
    Scroll.animateScroll.scrollToBottom({
      duration: 1500,
      delay: 100,
      smooth: true,
      containerId: 'ContainerElementID',
      offset: 50,
    });
  };

  return (
    <div className="app">
      <Searchbar onSubmit={onSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onModal={openModal} />
      )}
      {showModal && <Modal largeImage={largeImage} closeModal={closeModal} />}
      {showLoadMore && <Button onShowMore={showMore} />}
      {loading && <Loader />}
    </div>
  );
};
