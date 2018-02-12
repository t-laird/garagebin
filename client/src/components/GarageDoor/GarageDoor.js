import React from 'react';
import './GarageDoor.css';

const GarageDoor = ({ status }) => {;
  return (
    <div className={`GarageDoor ${status}`}>
    </div>
  )
}

export default GarageDoor;