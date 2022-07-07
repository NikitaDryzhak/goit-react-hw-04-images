import { useState } from 'react';
import { toast } from 'react-toastify';

import s from './SearchBar.module.css';

function Searchbar({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');

  const handleInputChange = e => {
    setPictureName(e.currentTarget.value);
  };

  const onChange = e => {
    e.preventDefault();
    if (!pictureName) {
      toast.warn('Please, enter the picture name!');
    }
    onSubmit(pictureName);
    reset();
  };

  const reset = () => {
    setPictureName('');
  };

  return (
    <>
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={onChange}>
          <button type="submit" className={s.button}>
            <span className={s.btnLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
            value={pictureName}
          />
        </form>
      </header>
    </>
  );
}

export default Searchbar;
