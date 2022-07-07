import s from './Modal.module.css';
import { useEffect } from 'react';

function Modal({ largeImageURL, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const onBackdropClick = e => {
    console.log(e.currentTarget);
    console.log(e.target);
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div className={s.overlay} onClick={onBackdropClick}>
      <div className={s.modal}>
        <img className={s.modalImg} src={largeImageURL} alt="picName" />
      </div>
    </div>
  );
}

export default Modal;
