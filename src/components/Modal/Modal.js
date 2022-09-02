import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import s from '../Modal/Modal.module.css';

export const Modal = ({ closeModal, largeImage }) => {
  const keyDownCallback = useCallback(
    e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownCallback);
    return () => {
      window.removeEventListener('keydown', keyDownCallback);
    };
  }, [keyDownCallback]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  return (
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img className={s.Image} src={largeImage} alt="choosed foto" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
