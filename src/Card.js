import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Like from './Like';
import Cross from './Cross';
import './css/Card.css';

class Card extends Component {

    render() {
        const { title, category, id, handleClickRemoveMovie, likes, dislikes } = this.props;
        return (
            <div className="card">
                <h4>{ title }</h4>
                <div
                    onClick={handleClickRemoveMovie}
                    id={id}
                >
                    <Cross />
                </div>
                <div className="card-footer">
                    <div className="category">
                        <p>{ category }</p>
                    </div>
                    <div className="icon">
                        <Like
                            likes={likes}
                            dislikes={dislikes}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleClickRemoveMovie: PropTypes.func.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
};

export default Card;