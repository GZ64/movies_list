import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movies from './Movies.js';
import './css/Pagination.css';

class Pagination extends Component {

    render() {
        const { movies, filter, handleClickRemoveMovie, checkedItems, currentPage, itemPerPage, handleClickNextPrev, handleChangeItemPerPage } = this.props;

        return (
            <div>
                <div>
                    <Movies
                        movies={movies}
                        filter={filter}
                        checkedItems={checkedItems}
                        handleClickRemoveMovie={handleClickRemoveMovie}
                        currentPage={currentPage}
                        itemPerPage={itemPerPage}
                    />
                </div>
                <div className="controls">
                    <button onClick={handleClickNextPrev} name="left" id="left">Prev</button>
                    <select id="itemPerPage" name="item" onChange={handleChangeItemPerPage} value={itemPerPage}>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                    </select>
                    <button onClick={handleClickNextPrev} name="right" id="right">Next</button>
                </div>
            </div>
        );
    }

}

Pagination.propTypes = {
    movies: PropTypes.array.isRequired,
    filter: PropTypes.bool.isRequired,
    handleClickRemoveMovie: PropTypes.func.isRequired,
    checkedItems: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemPerPage: PropTypes.number.isRequired,
    handleClickNextPrev: PropTypes.func.isRequired,
    handleChangeItemPerPage: PropTypes.func.isRequired
};

export default Pagination;