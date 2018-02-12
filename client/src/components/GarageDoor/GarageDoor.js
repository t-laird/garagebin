import React from 'react';
import './GarageDoor.css';

const GarageDoor = ({ status }) => {
  console.log(status);
  return (
    <div className={`GarageDoor ${status}`}>
    </div>
  )
}

export default GarageDoor;