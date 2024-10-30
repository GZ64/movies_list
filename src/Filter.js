import React from 'react';
import PropTypes from 'prop-types';
import './css/Filter.css'

class Filter extends React.Component {

    render() {
        const {checked, handleChangeFilter, categoriesAvailable} = this.props;

        return (
            categoriesAvailable.map((item, index) => {
                return <div className="categoryItem" key={index}>
                            <input type="checkbox" name={item} id={item} checked={checked} onChange={handleChangeFilter}/><label
                            htmlFor={item}>{item}</label><br/>
                        </div>
            })
        );
    }
}

Filter.propTypes = {
    checked: PropTypes.bool,
    handleChangeFilter: PropTypes.func.isRequired,
    categoriesAvailable: PropTypes.array.isRequired,
};

export default Filter;