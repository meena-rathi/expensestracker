import React from 'react';
import { Image } from 'react-bootstrap';

const Avatar = ({ src}) => {
  return (
    <Image
      src={src || 'https://via.placeholder.com/50'}
      roundedCircle
      style={{ width: '40px', height: '40px' }} 
    />
  );
};

export default Avatar;



