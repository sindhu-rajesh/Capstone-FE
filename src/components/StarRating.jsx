//import React from 'react';
//import { FontAwesomeIcon } from '@font-awesome/react-fontawesome';
//import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ rating, onRatingChange }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? solidStar : regularStar}
          style={{ cursor: 'pointer' }}
          onClick={() => onRatingChange(i)}
          color='orange'
        />
      );
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

import PropTypes from 'prop-types';

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

export default StarRating;


