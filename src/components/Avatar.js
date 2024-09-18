// import React from "react";
// import styles from "../styles/Avatar.module.css";
// import defaultAvatar from "../assets/logo.webp"; // Import the default image

// const Avatar = ({ src = defaultAvatar, height = 45, text }) => {
//   return (
//     <span>
//       <img
//         className={styles.Avatar}
//         src={src}
//         height={height}
//         width={height}
//         alt="avatar"
//       />
//       {text}
//     </span>
//   );
// };

// export default Avatar;
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



