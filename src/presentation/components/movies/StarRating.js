import React, { useState } from 'react';

const StarRating = ({ value = 0, onChange, readOnly = false, size = 'md' }) => {
  const [hovered, setHovered] = useState(0);
  const displayValue = hovered || value;

  const sizeClass = {
    sm: 'fs-6',
    md: 'fs-4',
    lg: 'fs-2',
  }[size] || 'fs-4';

  return (
    <div className="d-inline-flex gap-1" style={{ cursor: readOnly ? 'default' : 'pointer' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${
            star <= displayValue ? 'bi-star-fill text-warning' : 'bi-star text-secondary opacity-50'
          } ${sizeClass}`}
          onClick={() => !readOnly && onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          style={{ transition: 'color 0.1s' }}
        />
      ))}
    </div>
  );
};

export default StarRating;