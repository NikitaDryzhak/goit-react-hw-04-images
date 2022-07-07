import React, { Component } from 'react';
import s from './SearchBar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    pictureName: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = e => {
    this.setState({ pictureName: e.currentTarget.value });
  };

  onChange = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.pictureName);
    this.reset();
  };

  reset = () => {
    this.setState({ pictureName: '' });
  };
  render() {
    const { onChange, handleInputChange } = this;
    const { pictureName } = this.state;

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
}

export default Searchbar;
