import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class Movies extends Component {

    render() {
        const {currentPage, itemPerPage, movies, handleClickRemoveMovie, filter, checkedItems} = this.props;

        const renderMovies = movies.map((item, index) => {

            let indexEnd = (currentPage * itemPerPage) - 1;
            let indexStart = indexEnd - (itemPerPage - 1);
            if (index >= indexStart && index <= indexEnd) {
                return <Card
                    key={index}
                    title={item.title}
                    category={item.category}
                    id={item.id}
                    handleClickRemoveMovie={handleClickRemoveMovie}
                    likes={item.likes}
                    dislikes={item.dislikes}
                />
            } else {
                return "";
            }
        });

        const renderMoviesSort = () => {
            let indexEnd = (currentPage * itemPerPage) - 1;
            let indexStart = indexEnd - (itemPerPage - 1);
            let tab = [];
            movies.map((item, index) => {
                if (checkedItems.indexOf(item.category) !== -1) {
                    tab.push({
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        likes: item.likes,
                        dislikes: item.dislikes
                    });
                    return "";
                } else {
                    return "";
                }
            });

            return tab.map((item, index) => {
                if (index >= indexStart && index <= indexEnd) {
                    return <Card
                        key={index}
                        title={item.title}
                        category={item.category}
                        id={item.id}
                        handleClickRemoveMovie={handleClickRemoveMovie}
                        likes={item.likes}
                        dislikes={item.dislikes}
                    />
                } else {
                    return "";
                }
            });
        };

        return (
            <div className="movies">{filter ? renderMoviesSort() : renderMovies}</div>
        );
    }
}

Movies.propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemPerPage: PropTypes.number.isRequired,
    movies: PropTypes.array.isRequired,
    handleClickRemoveMovie: PropTypes.func.isRequired,
    filter: PropTypes.bool.isRequired,
    checkedItems: PropTypes.array.isRequired,
};

export default Movies;